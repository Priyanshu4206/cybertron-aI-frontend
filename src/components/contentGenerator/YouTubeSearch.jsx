import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaPlay, FaClock, FaEye } from 'react-icons/fa';
import Input from '../common/Input';
import Button from '../common/Button';
import { dummyVideos } from '../../utils/dummyData';
import Spinner from '../common/Spinner';
import { EmptyState } from '../imageGenerator/EmptyState';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow-y: auto;
  padding: 16px;
  width: 100%;
  background-color: #fff;
`;

const Title = styled.h2`
  font-size: 28px;
  color: #111827;
  text-align: center;
  font-weight: 600;
`;

const SearchForm = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const SearchBarRow = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 1.25rem;
  width: 100%;
  gap: 1rem;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  color: #333;
  outline: none;
  
  &::placeholder {
    color: #999;
  }
`;

const VideoResults = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
`;

const VideoList = styled.div`
  display: grid;
  gap: 16px;
  padding: 16px 8px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (min-width: 768px) and (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const VideoCard = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.selected ? '#000' : 'transparent'};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const VideoThumbnail = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  background: ${props => props.bgGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 32px;
`;

const PlayIcon = styled(FaPlay)`
  background: rgba(0, 0, 0, 0.7);
  padding: 12px;
  border-radius: 50%;
`;

const ThumbnailOverlay = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const OverlayBadge = styled.div`
  background: ${props => props.bg || 'rgba(0, 0, 0, 0.7)'};
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
`;

const VideoInfo = styled.div`
  padding: 12px;
`;

const VideoTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin-bottom: 6px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 36px;
`;

const VideoChannel = styled.p`
  font-size: 12px;
  color: #000;
  margin-bottom: 6px;
`;

const VideoStats = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  color: #000;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
`;

const BottomButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: auto;  

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
`;
const SearchButton = styled(Button)`
  width: fit-content;
  min-width: 150px;
  margin-top: 0;
`;

const BottomButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  font-size: 14px;
  border: none;
  min-width: 140px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ScriptButton = styled(BottomButton)`
  background-color: #000;
  color: #fff;
  
  &:hover:not(:disabled) {
    background-color: #333;
  }
`;

const NextButton = styled(BottomButton)`
  background-color: #000;
  color: #fff;
  
  &:hover:not(:disabled) {
    background-color: #333;
  }
`;

const YouTubeSearch = ({ onVideoSelect, onHavePrompt }) => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const validateYoutubeUrl = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return regex.test(url);
  };

  const handleSubmit = async () => {
    if (!youtubeUrl.trim()) {
      setError('Please enter a YouTube URL or search term');
      return;
    }
    
    setError('');
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setShowResults(true);
      setIsSearching(false);
    }, 1000);
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleNext = () => {
    if (selectedVideo) {
      onVideoSelect(`https://youtube.com/watch?v=${selectedVideo.id}`);
    }
  };

  return (
    <Container>
      <SearchForm>
        <Title>Search Topic</Title>
        <InputGroup>
        <SearchBarRow>
            <SearchInput
                type="search"
                placeholder="Ex - Search Youtube video"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <FaSearch style={{ color: 'black', fontSize: '1.25rem' }} />
          </SearchBarRow>
          <SearchButton onClick={handleSubmit} disabled={!youtubeUrl.trim() || isSearching}>
            {isSearching ? 'Searching...' : 'Search'}
          </SearchButton>
        </InputGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </SearchForm>

      {isSearching ? <Spinner size="lg" /> : showResults ? (
        <VideoResults>
          <VideoList>
            {dummyVideos.map((video) => (
              <VideoCard
                key={video.id}
                selected={selectedVideo?.id === video.id}
                onClick={() => handleVideoSelect(video)}
              >
                <VideoThumbnail bgGradient={video.bgGradient}>
                  <PlayIcon />
                  <ThumbnailOverlay>
                    <OverlayBadge bg="rgba(0, 0, 0, 0.7)">{video.views}</OverlayBadge>
                    <OverlayBadge bg="#10b981">{video.percentage}</OverlayBadge>
                  </ThumbnailOverlay>
                </VideoThumbnail>
                <VideoInfo>
                  <VideoTitle>{video.title}</VideoTitle>
                  <VideoChannel>{video.channel}</VideoChannel>
                  <VideoStats>
                    <StatItem>
                      <FaEye />
                      <span>{video.views} views</span>
                    </StatItem>
                    <StatItem>
                      <FaClock />
                      <span>{video.duration}</span>
                    </StatItem>
                  </VideoStats>
                </VideoInfo>
              </VideoCard>
            ))}
          </VideoList>
        </VideoResults>
      ) : 
      <EmptyState 
        title="Find Video for Reference" 
        description="Search for a YouTube video to use as reference for your content"
      />}

      <BottomButtonContainer>
        <ScriptButton onClick={onHavePrompt}>
          I have Script & Promt
        </ScriptButton>
        <NextButton onClick={handleNext} disabled={!selectedVideo}>
          Next
        </NextButton>
      </BottomButtonContainer>
    </Container>
  );
};

export default YouTubeSearch;