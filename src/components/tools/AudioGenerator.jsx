import React, { useState, useRef } from 'react';
import styled from 'styled-components';

// Components
import Layout from '../layout/Layout';
import Card from '../common/Card';
import Button from '../common/Button';
import Spinner from '../common/Spinner';

const ToolContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[6]};
`;

const InputSection = styled(Card)`
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme }) => theme.colors.mediumGray};
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary}30;
  }
`;

const OptionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`;

const OptionLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Select = styled.select`
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[3]}`};
  border: 1px solid ${({ theme }) => theme.colors.mediumGray};
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary}30;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space[3]};
`;

const ResultSection = styled(Card)``;

const AudioPlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[4]};
  border: 1px solid ${({ theme }) => theme.colors.mediumGray};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

const AudioWaveform = styled.div`
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.md};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary}20 0%,
      ${({ theme }) => theme.colors.primary} 50%,
      ${({ theme }) => theme.colors.primary}20 100%
    );
    background-size: 200% 100%;
    animation: ${({ isPlaying }) => isPlaying ? 'wave 2s linear infinite' : 'none'};
    
    @keyframes wave {
      0% {
        background-position: 0% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
  }
`;

const AudioControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
`;

const PlayButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  cursor: pointer;
  border: none;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const AudioInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AudioTitle = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const AudioDuration = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.space[4]};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[2]};
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[8]} 0;
  gap: ${({ theme }) => theme.space[4]};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const AudioGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioGenerated, setAudioGenerated] = useState(false);
  const audioRef = useRef(null);
  
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };
  
  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setAudioGenerated(true);
      setIsGenerating(false);
    }, 3500);
  };
  
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleReset = () => {
    setPrompt('');
    setAudioGenerated(false);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
  
  const handleDownload = () => {
    // In a real app, you'd implement proper audio download
    alert('Download functionality would be implemented here.');
  };

  return (
    <Layout title="Audio Generator">
      <ToolContainer>
        <InputSection>
          <Card.Body>
            <h2>Generate Audio</h2>
            <p>Enter text to convert to speech or describe the audio you want to generate.</p>
            
            <TextArea
              value={prompt}
              onChange={handlePromptChange}
              placeholder="Generate a calm meditation music with nature sounds..."
            />
            
            <OptionsRow>
              <OptionGroup>
                <OptionLabel>Voice</OptionLabel>
                <Select>
                  <option>Male (Default)</option>
                  <option>Female</option>
                  <option>Child</option>
                  <option>Elder</option>
                </Select>
              </OptionGroup>
              
              <OptionGroup>
                <OptionLabel>Style</OptionLabel>
                <Select>
                  <option>Natural</option>
                  <option>Formal</option>
                  <option>Casual</option>
                  <option>Cheerful</option>
                </Select>
              </OptionGroup>
              
              <OptionGroup>
                <OptionLabel>Speed</OptionLabel>
                <Select>
                  <option>Normal</option>
                  <option>Slow</option>
                  <option>Fast</option>
                </Select>
              </OptionGroup>
            </OptionsRow>
            
            <ButtonRow>
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
              <Button 
                onClick={handleGenerate} 
                disabled={!prompt.trim() || isGenerating}
                isLoading={isGenerating}
                loadingText="Generating..."
              >
                Generate
              </Button>
            </ButtonRow>
          </Card.Body>
        </InputSection>
        
        {isGenerating ? (
          <LoadingContainer>
            <Spinner size="lg" />
            <p>Generating audio... This may take a moment.</p>
          </LoadingContainer>
        ) : audioGenerated ? (
          <ResultSection>
            <Card.Body>
              <h2>Generated Audio</h2>
              
              <AudioPlayerContainer>
                <AudioWaveform isPlaying={isPlaying} />
                
                <AudioControls>
                  <PlayButton onClick={handlePlayPause}>
                    {isPlaying ? '⏸' : '▶'}
                  </PlayButton>
                  
                  <AudioInfo>
                    <AudioTitle>Generated Audio</AudioTitle>
                    <AudioDuration>00:45</AudioDuration>
                  </AudioInfo>
                </AudioControls>
                
                {/* Hidden audio element */}
                <audio 
                  ref={audioRef}
                  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                  onEnded={() => setIsPlaying(false)}
                />
              </AudioPlayerContainer>
              
              <ActionBar>
                <div>
                  <p>AI-generated audio may require review and editing.</p>
                </div>
                <ActionButtons>
                  <Button variant="outline" onClick={handleDownload}>
                    Download
                  </Button>
                  <Button onClick={handleGenerate}>
                    Regenerate
                  </Button>
                </ActionButtons>
              </ActionBar>
            </Card.Body>
          </ResultSection>
        ) : null}
      </ToolContainer>
    </Layout>
  );
};

export default AudioGenerator; 