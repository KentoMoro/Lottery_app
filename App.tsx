import React, { useState, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { Camera, Download, RotateCcw, Trophy, Users } from 'lucide-react';
import { PRIZE_DATA } from './constants';
import { PrizeType, ViewState } from './types';
import { GachaAnimation } from './components/GachaAnimation';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('SELECTION');
  const [selectedPrize, setSelectedPrize] = useState<PrizeType | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const startLottery = (prize: PrizeType) => {
    setSelectedPrize(prize);
    setViewState('ANIMATING');

    // Determine winner immediately but show after animation
    const participants = PRIZE_DATA[prize].members;
    const randomIndex = Math.floor(Math.random() * participants.length);
    const selectedWinner = participants[randomIndex];
    setWinner(selectedWinner);

    // Animation lasts 6 seconds
    setTimeout(() => {
      setViewState('RESULT');
    }, 6000);
  };

  const reset = () => {
    setViewState('SELECTION');
    setSelectedPrize(null);
    setWinner(null);
  };

  const handleDownloadScreenshot = useCallback(async () => {
    if (resultRef.current) {
      try {
        const canvas = await html2canvas(resultRef.current, {
          backgroundColor: '#0f172a',
          scale: 2, // High resolution
        });
        const link = document.createElement('a');
        link.download = `lottery-result-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (err) {
        console.error('Screenshot failed:', err);
        alert('スクリーンショットの保存に失敗しました。');
      }
    }
  }, []);

  // --------------------------------------------------------------------------
  // RENDER: ANIMATION
  // --------------------------------------------------------------------------
  if (viewState === 'ANIMATING') {
    return <GachaAnimation />;
  }

  // --------------------------------------------------------------------------
  // RENDER: RESULT
  // --------------------------------------------------------------------------
  if (viewState === 'RESULT' && selectedPrize && winner) {
    const prizeInfo = PRIZE_DATA[selectedPrize];
    
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Flash Fade Out Overlay - This bridges the transition from the white Gacha screen */}
        <div className="fixed inset-0 bg-white animate-fade-out z-50 pointer-events-none"></div>

        {/* Background Ambient Glow */}
        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${prizeInfo.color} opacity-20 blur-3xl pointer-events-none`}></div>

        <div ref={resultRef} className="z-10 w-full max-w-2xl bg-gray-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center shadow-2xl relative flex flex-col items-center gap-8">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className={`p-4 rounded-full bg-gradient-to-br ${prizeInfo.color} shadow-lg shadow-${prizeInfo.color.split('-')[1]}-500/50`}>
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <p className="text-gray-400 uppercase tracking-widest font-gaming text-sm">Winner of</p>
            <h2 className={`text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${prizeInfo.color}`}>
              {prizeInfo.prizeName}
            </h2>
          </div>

          <div className="relative py-10 w-full">
            <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full"></div>
            
            <div className="flex flex-col items-center justify-center">
              <span className="text-2xl md:text-3xl text-gray-300 font-gaming tracking-widest mb-4">User:</span>
              <h1 className="relative text-7xl md:text-9xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] font-gaming animate-[bounce_1s_infinite]">
                {winner}
              </h1>
            </div>

            <div className="mt-8 text-xl text-yellow-300 font-bold drop-shadow-md">
              Congratulations!
            </div>
          </div>
          
          <div className="text-xs text-gray-500 font-mono">
            Lottery ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col md:flex-row gap-6 z-20">
          <button
            onClick={handleDownloadScreenshot}
            className="flex items-center gap-2 px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg border border-gray-600"
          >
            <Camera className="w-5 h-5" />
            画像を保存
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: SELECTION (HOME)
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-x-hidden selection:bg-purple-500 selection:text-white">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="relative container mx-auto px-4 py-12 flex flex-col min-h-screen">
        
        <header className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black font-gaming bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
            抽選ガチャアプリ（仮）
          </h1>
          <p className="text-gray-400 text-lg">Select a prize to start the draw</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start max-w-6xl mx-auto w-full flex-grow">
          
          {/* Card 1: Mousepad */}
          <PrizeCard 
            group={PRIZE_DATA[PrizeType.MOUSEPAD]} 
            onDraw={() => startLottery(PrizeType.MOUSEPAD)} 
          />

          {/* Card 2: Audio Interface */}
          <PrizeCard 
            group={PRIZE_DATA[PrizeType.AUDIO_INTERFACE]} 
            onDraw={() => startLottery(PrizeType.AUDIO_INTERFACE)} 
          />
          
        </div>
      </div>
    </div>
  );
};

// Sub-component for clean code structure
const PrizeCard: React.FC<{ group: typeof PRIZE_DATA[PrizeType.MOUSEPAD], onDraw: () => void }> = ({ group, onDraw }) => {
  return (
    <div className="group relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 hover:border-gray-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] flex flex-col h-full">
      {/* Glow Effect on Hover */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${group.color} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition duration-500 pointer-events-none`}></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${group.color} bg-opacity-10 self-start mb-4`}>
          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-white">Prize Pool</span>
        </div>

        <h3 className="text-3xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors">
          {group.prizeName}
        </h3>
        <p className="text-gray-400 mb-8">{group.description}</p>

        <div className="bg-black/40 rounded-xl p-6 mb-8 border border-white/5 flex-grow">
          <div className="flex items-center gap-2 mb-4 text-gray-300">
            <Users className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">抽選参加者 ({group.members.length})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {group.members.map((member) => (
              <span key={member} className="px-3 py-1.5 bg-gray-800 text-gray-200 text-sm font-mono rounded border border-gray-700">
                {member}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onDraw}
          className={`w-full py-5 rounded-xl text-lg font-bold font-gaming text-white bg-gradient-to-r ${group.color} hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transform hover:-translate-y-1 transition-all duration-200 active:scale-95`}
        >
          抽選開始
        </button>
      </div>
    </div>
  );
};

export default App;