import { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import exercisesData from '../data/exercises.json';
import { Image, Link, Brain, ArrowLeft, Check, X } from 'lucide-react';

type ExerciseMode = 'menu' | 'tebak-gambar' | 'cocokkan-kata' | 'ingat-urutan';

export function LatihanPage() {
    const [mode, setMode] = useState<ExerciseMode>('menu');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const { completeExercise } = useApp();

    const exercises = exercisesData.exercises;
    const tebakGambar = exercises.find(e => e.type === 'tebak-gambar');

    const resetExercise = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setIsCorrect(null);
    };

    const handleBackToMenu = () => {
        setMode('menu');
        resetExercise();
    };

    const handleAnswer = (answer: string, correct: string) => {
        setSelectedAnswer(answer);
        const correct_answer = answer === correct;
        setIsCorrect(correct_answer);

        if (correct_answer) {
            setScore(prev => prev + 1);
        }

        // Move to next question after delay
        setTimeout(() => {
            if (tebakGambar && currentQuestion < tebakGambar.questions!.length - 1) {
                setCurrentQuestion(prev => prev + 1);
                setSelectedAnswer(null);
                setIsCorrect(null);
            } else {
                setShowResult(true);
                completeExercise('ex1', score + (correct_answer ? 1 : 0));
            }
        }, 1500);
    };

    // Exercise Menu
    if (mode === 'menu') {
        return (
            <MainLayout title="Latihan Kognitif">
                <div className="px-5 py-6">
                    <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4 mb-6">
                        <p className="text-lg text-sky-800 text-center font-medium">
                            Pilih latihan untuk melatih daya ingat dan konsentrasi
                        </p>
                    </div>

                    <div className="space-y-4">
                        {/* Tebak Gambar */}
                        <Card
                            variant="elevated"
                            onClick={() => setMode('tebak-gambar')}
                            className="cursor-pointer hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-linear-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center">
                                    <Image size={40} className="text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-800">Tebak Gambar</h3>
                                    <p className="text-lg text-gray-600">Pilih nama yang cocok dengan gambar</p>
                                    <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                        Mudah
                                    </span>
                                </div>
                            </div>
                        </Card>

                        {/* Cocokkan Kata */}
                        <Card
                            variant="elevated"
                            onClick={() => setMode('cocokkan-kata')}
                            className="cursor-pointer hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-linear-to-br from-violet-400 to-violet-500 rounded-2xl flex items-center justify-center">
                                    <Link size={40} className="text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-800">Cocokkan Kata</h3>
                                    <p className="text-lg text-gray-600">Cocokkan kata dengan pasangannya</p>
                                    <span className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                                        Sedang
                                    </span>
                                </div>
                            </div>
                        </Card>

                        {/* Ingat Urutan */}
                        <Card
                            variant="elevated"
                            onClick={() => setMode('ingat-urutan')}
                            className="cursor-pointer hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-linear-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center">
                                    <Brain size={40} className="text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-800">Ingat Urutan</h3>
                                    <p className="text-lg text-gray-600">Ingat dan ulangi urutan warna</p>
                                    <span className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                                        Sedang
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </MainLayout>
        );
    }

    // Tebak Gambar Exercise
    if (mode === 'tebak-gambar') {
        if (!tebakGambar || !tebakGambar.questions) return null;

        const questions = tebakGambar.questions;
        const question = questions[currentQuestion];

        if (showResult) {
            return (
                <MainLayout showNav={false}>
                    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-8">
                        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-checkmark">
                            <Check size={64} className="text-green-500" strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
                            Latihan Selesai! 🎉
                        </h2>
                        <p className="text-2xl text-gray-600 text-center mb-8">
                            Skor Anda: <strong className="text-emerald-600">{score}/{questions.length}</strong>
                        </p>
                        <div className="space-y-4 w-full max-w-sm">
                            <Button fullWidth size="xl" onClick={() => { resetExercise(); }}>
                                Ulangi Latihan
                            </Button>
                            <Button fullWidth size="xl" variant="outline" onClick={handleBackToMenu}>
                                Kembali ke Menu
                            </Button>
                        </div>
                    </div>
                </MainLayout>
            );
        }

        return (
            <MainLayout showNav={false}>
                <div className="px-5 py-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={handleBackToMenu}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 min-h-12"
                        >
                            <ArrowLeft size={24} />
                            <span className="text-lg font-medium">Kembali</span>
                        </button>
                        <span className="text-lg font-bold text-gray-600">
                            {currentQuestion + 1}/{questions.length}
                        </span>
                    </div>

                    {/* Question */}
                    <div className="text-center mb-8">
                        <div className="text-9xl mb-6">{question.imageEmoji}</div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Apa nama gambar ini?
                        </h2>
                    </div>

                    {/* Answer Options */}
                    <div className="grid grid-cols-2 gap-4">
                        {question.options.map((option) => {
                            let buttonClass = 'bg-white border-2 border-gray-200 hover:border-emerald-400';

                            if (selectedAnswer) {
                                if (option === question.correctAnswer) {
                                    buttonClass = 'bg-green-100 border-2 border-green-500';
                                } else if (option === selectedAnswer) {
                                    buttonClass = 'bg-red-100 border-2 border-red-500';
                                }
                            }

                            return (
                                <button
                                    key={option}
                                    onClick={() => !selectedAnswer && handleAnswer(option, question.correctAnswer)}
                                    disabled={!!selectedAnswer}
                                    className={`
                    ${buttonClass}
                    rounded-2xl p-5 text-xl font-bold text-gray-800
                    transition-all duration-200
                    min-h-20
                    disabled:cursor-not-allowed
                    flex items-center justify-center gap-2
                  `}
                                >
                                    {selectedAnswer && option === question.correctAnswer && (
                                        <Check size={24} className="text-green-600" />
                                    )}
                                    {selectedAnswer && option === selectedAnswer && option !== question.correctAnswer && (
                                        <X size={24} className="text-red-600" />
                                    )}
                                    {option}
                                </button>
                            );
                        })}
                    </div>

                    {/* Feedback */}
                    {isCorrect !== null && (
                        <div className={`
              mt-6 p-4 rounded-2xl text-center text-xl font-bold animate-fade-in
              ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
            `}>
                            {isCorrect ? '✓ Benar! Bagus sekali!' : '✗ Kurang tepat, coba lagi!'}
                        </div>
                    )}
                </div>
            </MainLayout>
        );
    }

    // Placeholder for other exercises
    return (
        <MainLayout showNav={false}>
            <div className="px-5 py-6">
                <button
                    onClick={handleBackToMenu}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 min-h-12 mb-6"
                >
                    <ArrowLeft size={24} />
                    <span className="text-lg font-medium">Kembali</span>
                </button>

                <div className="text-center py-20">
                    <div className="text-6xl mb-6">🚧</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Latihan {mode === 'cocokkan-kata' ? 'Cocokkan Kata' : 'Ingat Urutan'}
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Latihan ini akan segera tersedia
                    </p>
                    <Button onClick={handleBackToMenu}>
                        Kembali ke Menu
                    </Button>
                </div>
            </div>
        </MainLayout>
    );
}
