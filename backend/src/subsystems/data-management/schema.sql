-- CampuStudy database schema (SQLite).
-- Every statement uses IF NOT EXISTS, so running this file again is safe.
-- Timestamps are UTC strings in SQLite's 'YYYY-MM-DD HH:MM:SS' format.

-- Students and instructors (US1, US2).
-- password_hash is nullable because sign-in may go through university
-- authentication (C2) instead of a CampuStudy password.
CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY,
    email         TEXT    NOT NULL UNIQUE COLLATE NOCASE,
    display_name  TEXT    NOT NULL,
    role          TEXT    NOT NULL DEFAULT 'student'
                          CHECK (role IN ('student', 'instructor')),
    password_hash TEXT,
    created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
) STRICT;

-- Study groups (US3, US4, US9, US10).
-- subject, location and max_size are required; max_size must be greater than one.
CREATE TABLE IF NOT EXISTS study_groups (
    id               INTEGER PRIMARY KEY,
    subject          TEXT    NOT NULL CHECK (length(trim(subject)) > 0),
    meeting_time     TEXT,
    location         TEXT    NOT NULL CHECK (length(trim(location)) > 0),
    max_size         INTEGER NOT NULL CHECK (max_size > 1),
    expertise_level  TEXT    CHECK (expertise_level IN ('beginner', 'intermediate', 'advanced')),
    study_preference TEXT,
    created_by       INTEGER REFERENCES users (id) ON DELETE SET NULL,
    created_at       TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at       TEXT    NOT NULL DEFAULT (datetime('now'))
) STRICT;

CREATE INDEX IF NOT EXISTS idx_study_groups_subject ON study_groups (subject);

-- Who belongs to which group, and who administers it (US3, US6, US8, US12).
-- Leaving or being removed deletes the row.
CREATE TABLE IF NOT EXISTS group_memberships (
    group_id  INTEGER NOT NULL REFERENCES study_groups (id) ON DELETE CASCADE,
    user_id   INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    role      TEXT    NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
    joined_at TEXT    NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (group_id, user_id)
) STRICT;

-- Supports "my joined groups" lookups (US12).
CREATE INDEX IF NOT EXISTS idx_group_memberships_user ON group_memberships (user_id);

-- Invitations sent by a group admin and invitation requests sent by a student
-- (US5, US7, US11).
--   kind = 'invite':  an admin (sent_by) invites user_id to the group.
--   kind = 'request': user_id asks to join; sent_by is that same user.
-- Rows are kept after a response so there is a history of decisions.
CREATE TABLE IF NOT EXISTS invitations (
    id           INTEGER PRIMARY KEY,
    group_id     INTEGER NOT NULL REFERENCES study_groups (id) ON DELETE CASCADE,
    user_id      INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    sent_by      INTEGER REFERENCES users (id) ON DELETE SET NULL,
    kind         TEXT    NOT NULL CHECK (kind IN ('invite', 'request')),
    status       TEXT    NOT NULL DEFAULT 'pending'
                         CHECK (status IN ('pending', 'accepted', 'declined', 'cancelled')),
    created_at   TEXT    NOT NULL DEFAULT (datetime('now')),
    responded_at TEXT
) STRICT;

-- At most one open invitation or request per user per group.
CREATE UNIQUE INDEX IF NOT EXISTS idx_invitations_one_pending
    ON invitations (group_id, user_id)
    WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_invitations_user ON invitations (user_id, status);
CREATE INDEX IF NOT EXISTS idx_invitations_group ON invitations (group_id, status);
