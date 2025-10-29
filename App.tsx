
import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ContentCard } from './components/ContentCard';
import { ContentSkeleton } from './components/LoadingSpinner';
import { generateAllContent } from './services/geminiService';
import type { GeneratedContent } from './types';
import { Tone, Platform } from './types';

const App: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [tone, setTone] = useState<Tone>(Tone.Professional);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<Record<Platform, GeneratedContent> | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const content = await generateAllContent(idea, tone);
      setGeneratedContent(content);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />
        
        <div className="bg-gray-800/50 p-6 md:p-8 rounded-xl shadow-2xl border border-gray-700">
            <InputForm
                idea={idea}
                setIdea={setIdea}
                tone={tone}
                setTone={setTone}
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>

        <div className="mt-12">
            {isLoading && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <ContentSkeleton />
                    <ContentSkeleton />
                    <ContentSkeleton />
                </div>
            )}

            {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-lg text-center">
                    <p className="font-bold">Generation Failed</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {generatedContent && (
                 <div className="grid grid-cols-1 gap-8">
                    <ContentCard platform={Platform.LinkedIn} content={generatedContent.LinkedIn} />
                    <ContentCard platform={Platform.Twitter} content={generatedContent.Twitter} />
                    <ContentCard platform={Platform.Instagram} content={generatedContent.Instagram} />
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
