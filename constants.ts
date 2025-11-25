import { ParticipantGroup, PrizeType } from './types';

export const PRIZE_DATA: Record<PrizeType, ParticipantGroup> = {
  [PrizeType.MOUSEPAD]: {
    prize: PrizeType.MOUSEPAD,
    prizeName: "マウスパッド (夕霧)",
    description: "滑り心地抜群のゲーミングマウスパッド",
    members: ['A', 'D', 'H', 'I'],
    color: "from-pink-500 to-rose-600",
    imageAlt: "Mousepad"
  },
  [PrizeType.AUDIO_INTERFACE]: {
    prize: PrizeType.AUDIO_INTERFACE,
    prizeName: "オーディオインターフェース (YAMAHA ZG01)",
    description: "ゲーム配信に最適なオーディオミキサー",
    members: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'I'],
    color: "from-cyan-500 to-blue-600",
    imageAlt: "Audio Interface"
  }
};