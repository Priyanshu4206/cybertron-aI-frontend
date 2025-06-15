import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { MdDownload, MdImage } from 'react-icons/md';

// Components
import Layout from '../layout/Layout';
import SubSidebar from '../layout/SubSidebar';
import Button from '../common/Button';
import Spinner from '../common/Spinner';

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f9f9f9;
  height: calc(100vh - 64px);
`;

const PromptArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PromptTextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #000;
  }

  &::placeholder {
    color: #999;
  }
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: ${props => props.count > 2000 ? 'red' : '#666'};
`;

const RatioSelector = styled.div`
  margin-top: 16px;
`;

const RatioTitle = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

const RatioOptions = styled.div`
  display: flex;
  gap: 8px;
`;

const RatioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${props => props.selected ? '#000' : '#e0e0e0'};
  background-color: ${props => props.selected ? '#f0f0f0' : 'white'};
  cursor: pointer;
  
  input {
    display: none;
  }
`;

const ReferenceLinks = styled.div`
  margin-top: 16px;
`;

const ReferenceTitle = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
`;

const ReferenceInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const AddButton = styled.button`
  background: #5c5cff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
`;

const LanguageSection = styled.div`
  margin-top: 16px;
`;

const LanguageTitle = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

const SelectorsRow = styled.div`
  display: flex;
  gap: 16px;
`;

const Selector = styled.select`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  min-width: 100px;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const GenerateButton = styled.button`
  width: 100%;
  background: #000;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ImageCard = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  background: #f0f0f0;
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 8px;
`;

const SelectImageButton = styled.button`
  background: ${props => props.selected ? '#000' : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.selected ? 'white' : '#000'};
  border: 1px solid ${props => props.selected ? '#000' : '#ccc'};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const DownloadButton = styled.button`
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const SelectionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
`;

const DownloadAllButton = styled.button`
  background: ${props => props.disabled ? '#ccc' : '#000'};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
`;

const NavigationItem = styled.div`
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const NavigationIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const NavigationText = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const HistoryItem = styled.div`
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const HistoryPrompt = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HistoryDate = styled.div`
  font-size: 12px;
  color: #666;
`;

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedRatio, setSelectedRatio] = useState('16:9');
  const [referenceLink, setReferenceLink] = useState('');
  const [language, setLanguage] = useState('10');
  const [type, setType] = useState('Type');
  const [style, setStyle] = useState('Style');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Mock image generation
  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Generate 4 placeholder images
      const images = Array(4).fill(0).map((_, i) => ({
        id: `img-${Date.now()}-${i}`,
        url: `https://picsum.photos/seed/${Date.now() + i}/600/600`,
        alt: `Generated image ${i+1} based on prompt: ${prompt}`
      }));
      
      setGeneratedImages(images);
      setSelectedImages([]);
      setSelectAll(false);
      setIsGenerating(false);
    }, 3000);
  };

  const handleSelectImage = (imageId) => {
    setSelectedImages(prev => {
      if (prev.includes(imageId)) {
        return prev.filter(id => id !== imageId);
      } else {
        return [...prev, imageId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedImages([]);
    } else {
      setSelectedImages(generatedImages.map(img => img.id));
    }
    setSelectAll(!selectAll);
  };

  const handleDownloadImage = (imageUrl) => {
    // In a real app, you'd implement proper image download
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSelected = () => {
    // In a real app, you'd implement batch download
    selectedImages.forEach(imgId => {
      const image = generatedImages.find(img => img.id === imgId);
      if (image) {
        handleDownloadImage(image.url);
      }
    });
  };

  // Main content for SubSidebar
  const mainContent = (
    <PromptArea>
      <PromptTextArea 
        placeholder="Paste Your Prompt Here..." 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <CharCount count={prompt.length}>{prompt.length}/2000</CharCount>
      
      <RatioSelector>
        <RatioTitle>Ratio</RatioTitle>
        <RatioOptions>
          <RatioOption selected={selectedRatio === '16:9'}>
            <input 
              type="radio" 
              name="ratio" 
              value="16:9" 
              checked={selectedRatio === '16:9'} 
              onChange={() => setSelectedRatio('16:9')} 
            />
            16:9
          </RatioOption>
          <RatioOption selected={selectedRatio === '9:16'}>
            <input 
              type="radio" 
              name="ratio" 
              value="9:16" 
              checked={selectedRatio === '9:16'} 
              onChange={() => setSelectedRatio('9:16')} 
            />
            9:16
          </RatioOption>
          <RatioOption selected={selectedRatio === '16:9'}>
            <input 
              type="radio" 
              name="ratio" 
              value="16:9" 
              checked={selectedRatio === '16:9'} 
              onChange={() => setSelectedRatio('16:9')} 
            />
            16:9
          </RatioOption>
          <RatioOption selected={selectedRatio === '16:9'}>
            <input 
              type="radio" 
              name="ratio" 
              value="16:9" 
              checked={selectedRatio === '16:9'} 
              onChange={() => setSelectedRatio('16:9')} 
            />
            16:9
          </RatioOption>
        </RatioOptions>
      </RatioSelector>
      
      <ReferenceLinks>
        <ReferenceTitle>
          Add Reference Image Links
          <span>00/100</span>
        </ReferenceTitle>
        <div style={{ display: 'flex', gap: '8px' }}>
          <ReferenceInput 
            placeholder="Add Image Links Here..." 
            value={referenceLink}
            onChange={(e) => setReferenceLink(e.target.value)}
          />
          <AddButton>Add</AddButton>
        </div>
      </ReferenceLinks>
      
      <LanguageSection>
        <LanguageTitle>Language & Type & Industry</LanguageTitle>
        <SelectorsRow>
          <Selector value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </Selector>
          <Selector value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Type">Type</option>
            <option value="Type1">Type 1</option>
            <option value="Type2">Type 2</option>
          </Selector>
          <Selector value={style} onChange={(e) => setStyle(e.target.value)}>
            <option value="Style">Style</option>
            <option value="Modern">Modern</option>
            <option value="Vintage">Vintage</option>
          </Selector>
        </SelectorsRow>
      </LanguageSection>
      
      <GenerateButton 
        onClick={handleGenerate}
        disabled={!prompt.trim() || isGenerating}
      >
        {isGenerating ? <Spinner size="sm" color="white" /> : 'Generate Images'}
      </GenerateButton>
    </PromptArea>
  );

  // Navigation content for SubSidebar
  const navigationContent = (
    <div>
      <NavigationItem>
        <NavigationIcon>🖼️</NavigationIcon>
        <NavigationText>Text to Image</NavigationText>
      </NavigationItem>
      <NavigationItem>
        <NavigationIcon>🎨</NavigationIcon>
        <NavigationText>Image Editor</NavigationText>
      </NavigationItem>
      <NavigationItem>
        <NavigationIcon>🔄</NavigationIcon>
        <NavigationText>Image to Image</NavigationText>
      </NavigationItem>
      <NavigationItem>
        <NavigationIcon>📷</NavigationIcon>
        <NavigationText>Thumbnail Generator</NavigationText>
      </NavigationItem>
      <NavigationItem>
        <NavigationIcon>🎭</NavigationIcon>
        <NavigationText>Style Transfer</NavigationText>
      </NavigationItem>
    </div>
  );

  // History content for SubSidebar
  const historyContent = (
    <div>
      <HistoryItem>
        <HistoryPrompt>A futuristic city with flying cars and neon lights</HistoryPrompt>
        <HistoryDate>Today, 2:30 PM</HistoryDate>
      </HistoryItem>
      <HistoryItem>
        <HistoryPrompt>Mountain landscape with sunset and lake reflection</HistoryPrompt>
        <HistoryDate>Today, 11:45 AM</HistoryDate>
      </HistoryItem>
      <HistoryItem>
        <HistoryPrompt>Cyberpunk character with glowing tech implants</HistoryPrompt>
        <HistoryDate>Yesterday, 8:15 PM</HistoryDate>
      </HistoryItem>
      <HistoryItem>
        <HistoryPrompt>Abstract digital art with geometric shapes</HistoryPrompt>
        <HistoryDate>Yesterday, 3:20 PM</HistoryDate>
      </HistoryItem>
    </div>
  );

  return (
    <Layout title="Image Generation">
      <MainContainer>
        <SubSidebar
          contextName="Image Generation"
          mainContent={mainContent}
          navigationContent={navigationContent}
          showHistoryToggle={true}
          historyContent={historyContent}
        />
        
        <ContentArea>
          {isGenerating ? (
            <LoadingContainer>
              <Spinner size="lg" />
              <p>Generating your images... Please wait.</p>
            </LoadingContainer>
          ) : generatedImages.length > 0 ? (
            <>
              <ImagesGrid>
                {generatedImages.map((image) => (
                  <ImageCard key={image.id}>
                    <ImageContainer>
                      <StyledImage src={image.url} alt={image.alt} />
                      <ImageOverlay>
                        <SelectImageButton 
                          selected={selectedImages.includes(image.id)}
                          onClick={() => handleSelectImage(image.id)}
                        >
                          <FaCheck size={16} />
                        </SelectImageButton>
                        <DownloadButton onClick={() => handleDownloadImage(image.url)}>
                          <MdDownload size={16} />
                        </DownloadButton>
                      </ImageOverlay>
                    </ImageContainer>
                  </ImageCard>
                ))}
              </ImagesGrid>
              
              <ActionsBar>
                <SelectionInfo>
                  <Checkbox 
                    type="checkbox" 
                    checked={selectAll} 
                    onChange={handleSelectAll} 
                    id="select-all"
                  />
                  <label htmlFor="select-all">
                    {selectAll ? 'All' : `Selected (${selectedImages.length})`}
                  </label>
                </SelectionInfo>
                
                <DownloadAllButton 
                  disabled={selectedImages.length === 0}
                  onClick={handleDownloadSelected}
                >
                  <MdDownload size={18} />
                  Download all
                </DownloadAllButton>
              </ActionsBar>
            </>
          ) : (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              height: '100%',
              color: '#666'
            }}>
              <MdImage size={64} />
              <p>Enter a prompt and generate images to see results here</p>
            </div>
          )}
        </ContentArea>
      </MainContainer>
    </Layout>
  );
};

export default ImageGenerator; 