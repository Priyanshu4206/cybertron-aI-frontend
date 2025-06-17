import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdArrowCircleDown } from 'react-icons/md';
import { sampleScriptContent } from '../../../utils/scriptGeneratorData';
import { EmptyState, LoadingView } from '../../imageGenerator/EmptyState';
import ScriptEditor from '../../scriptGenerator/ScriptEditor';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  padding: 16px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 56px); /* Subtract title height */
  overflow: hidden;
  
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const LeftPanel = styled.div`
  width: 100%;
  padding: 16px;
  border-right: 1px solid #6666;
  overflow-y: auto;
  
  @media (min-width: 1024px) {
    width: 33.333333%;
    min-width: 300px;
    max-width: 400px;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const VideoThumbnail = styled.div`
  aspect-ratio: 16/9;
  background: linear-gradient(135deg, #000, #666);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

const VideoOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoContent = styled.div`
  text-align: center;
  color: white;
`;

const VideoTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

const VideoTag = styled.div`
  background-color: #000;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  transform: rotate(-12deg);
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const VideoDetails = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background-color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const VideoInfo = styled.div`
  flex: 1;
`;

const VideoInfoTitle = styled.h3`
  font-weight: 600;
  font-size: 0.875rem;
  margin: 0 0 4px 0;
`;

const VideoInfoChannel = styled.p`
  font-size: 0.75rem;
  color: #000;
  margin: 0;
`;

const VideoInfoStats = styled.p`
  font-size: 0.75rem;
  color: #000;
  margin: 0;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const EditorContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

const BottomControls = styled.div`
  border-top: 1px solid #6666;
  padding: 16px;
  background-color: #fff;
`;

const ControlsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  
  @media (min-width: 640px) {
    flex-direction: row;
    gap: 0;
  }
`;

const LeftControls = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 16px;
`;

const PrimaryButton = styled.button`
  background-color: black;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: 500;
  
  @media (max-width: 640px) {
    width: 100%;
  }
  
  &:hover {
    background-color: #333;
  }
`;

const ScriptingTranscribeScreen = ({ onGenerateAudio }) => {
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAudio = () => {
    if (onGenerateAudio) {
      onGenerateAudio(generatedScript);
    } else {
      console.log('Generate audio for script');
    }
  };

  // Handle script generation
  const handleGenerateScript = () => {
    setIsGenerating(true);

    // Simulate API call
    setTimeout(() => {
      setGeneratedScript(sampleScriptContent);
      setIsGenerating(false);
    }, 2000);
  };

  useEffect(() => {
    handleGenerateScript();
  }, []);

  return (
    <Container>
      <Title>Scripting & Transcribe</Title>
      {/* Main Content */}
      <MainContent>
        {/* Left Side - Video Section */}
        <LeftPanel>
          <VideoContainer>
            <VideoThumbnail>
              <VideoOverlay>
                <VideoContent>
                  <VideoTitle>FIX THIS NOW!</VideoTitle>
                  <VideoTag>
                    <MdArrowCircleDown />
                  </VideoTag>
                </VideoContent>
              </VideoOverlay>
            </VideoThumbnail>
          </VideoContainer>

          <VideoDetails>
            <Avatar>YT</Avatar>
            <VideoInfo>
              <VideoInfoTitle>
                How to EDIT Documentary Style Videos | After Effects Tutorial
              </VideoInfoTitle>
              <VideoInfoChannel>YasTutorialCoast</VideoInfoChannel>
              <VideoInfoStats>39K • 7 months</VideoInfoStats>
            </VideoInfo>
          </VideoDetails>
        </LeftPanel>

        {/* Right Side - Editor */}
        <RightPanel>
          <EditorContainer>
            {isGenerating ? (
              <LoadingView message="Generating your script... Please wait." />
            ) : generatedScript ? (
              <ScriptEditor initialContent={generatedScript} />
            ) : (
              <EmptyState title="No script generated" description="Please generate a script to see the editor" />
            )}
          </EditorContainer>

          <BottomControls>
            <ControlsContent>
              <LeftControls>
                <PrimaryButton onClick={generateAudio}>
                  Generate Audio for this script
                </PrimaryButton>
              </LeftControls>
            </ControlsContent>
          </BottomControls>
        </RightPanel>
      </MainContent>
    </Container>
  );
};

export default ScriptingTranscribeScreen;