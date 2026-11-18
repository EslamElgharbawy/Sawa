export interface Participant {
  id: string;
  name: string;
  avatarLetter?: string;
  avatarBg?: string;
  isMuted?: boolean;
  isVideoOff?: boolean;
  isSpeaking?: boolean;
  isLocal?: boolean;
  isHandRaised?: boolean;
  stream?: MediaStream;
}

export interface MeetingSessionInfo {
  id: string;
  title: string;
  subject: string;
  startedAt: Date;
  participants: Participant[];
}
