/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Annotation {
  id: string;
  userId: string;
  points: number[];
  color: string;
  strokeWidth: number;
  timestamp: number;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userColor: string;
  text: string;
  timestamp: number;
  videoTime: number;
}

export interface User {
  id: string;
  name: string;
  color: string;
}

export interface SessionState {
  annotations: Annotation[];
  comments: Comment[];
  users: Record<string, User>;
}
