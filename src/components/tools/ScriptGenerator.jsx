import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHistory, FaCopy, FaBold, FaItalic, FaListUl, FaListOl, FaLink, FaChevronDown, FaSearch } from 'react-icons/fa';
import { BsThreeDots, BsTypeH2 } from 'react-icons/bs';
import { RiTranslate } from 'react-icons/ri';
import { MdUnfoldLess, MdUnfoldMore } from 'react-icons/md';

// Components
import Layout from '../layout/Layout';

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  padding: 10px;
  gap: 20px;
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RightPanel = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
`;

const InputPromptContainer = styled.div`
  margin-bottom: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: ${props => props.height || '120px'};
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: 'Segoe UI', sans-serif;
  font-size: 14px;
  resize: none;
  
  &:focus {
    outline: none;
    border-color: #666;
  }
  
  &::placeholder {
    color: #999;
  }
`;

const LinkInput = styled(TextArea)`
  height: 80px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  
  ${props => props.primary && `
    background-color: #000;
    color: white;
    &:hover {
      background-color: #333;
    }
  `}
  
  ${props => props.secondary && `
    background-color: #f0f0f0;
    color: #333;
    &:hover {
      background-color: #e0e0e0;
    }
  `}
  
  ${props => props.fullWidth && `
    width: 100%;
  `}
  
  ${props => props.round && `
    border-radius: 20px;
  `}
`;

const SelectRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
  color: #333;
  
  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const CountDisplay = styled.div`
  font-size: 12px;
  color: #999;
  text-align: right;
  margin-top: 4px;
`;

// Editor Header
const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid #e0e0e0;
`;

const ScriptTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const EditorToolbar = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 12px;
  border-bottom: 1px solid #e0e0e0;
  align-items: center;
  flex-wrap: wrap;
`;

const FontSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SizeSelector = styled.div`
  width: 36px;
  text-align: center;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 2px 4px;
`;

const FontName = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 2px 8px;
`;

const FormatButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  
  &:hover {
    background-color: #f0f0f0;
  }
  
  ${props => props.active && `
    background-color: #e0e0e0;
  `}
`;

const EditorContent = styled.div`
  padding: 20px;
  min-height: 400px;
  font-family: 'Segoe UI', sans-serif;
`;

const ContentEditable = styled.div`
  width: 100%;
  min-height: 350px;
  outline: none;
  padding: 8px;
  white-space: pre-wrap;
  border: 1px solid transparent;
  
  &:focus {
    border: 1px dashed #e0e0e0;
  }
`;

const HighlightedText = styled.div`
  background-color: #f0f0ff;
  border: 1px solid #e0e0ff;
  padding: 4px;
  margin: 8px 0;
  border-radius: 4px;
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-top: 1px solid #e0e0e0;
  margin-top: auto;
`;

const TabsRow = styled.div`
  display: flex;
  margin-top: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  overflow: hidden;
`;

const Tab = styled.button`
  flex: 1;
  padding: 8px 16px;
  background: ${props => props.active ? "#635bff" : "#f0f0f0"};
  color: ${props => props.active ? "white" : "#333"};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
  
  &:hover {
    background: ${props => props.active ? "#5349d2" : "#e0e0e0"};
  }
`;

const ScriptGenerator = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [prompt, setPrompt] = useState('');
  const [keywords, setKeywords] = useState('');
  const [youtubeLinks, setYoutubeLinks] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [scriptContent, setScriptContent] = useState(`Are you just getting started with Fantasy games? Whether it is fantasy cricket, fantasy football, fantasy kabaddi or fantasy basketball, having an understanding about the points system is the best way to selectmatches and get started with it.\n\nThe total points calculated for.Are you just getting started with Fantasy games? Whether it is fantasy cricket, fantasy football, fantasy kabaddi or fantasy basketball, having  an understanding about the points system is the best way to selectmatches and get started with it. The total points calculated for.`);

  return (
    <Layout title="Script Generator">
      <PageContainer>
        <LeftPanel>
          <SectionTitle>Topic & keyword & Prompt</SectionTitle>
          <InputPromptContainer>
            <TextArea 
              placeholder="Paste Your Promt Here..." 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <CountDisplay>00/2000</CountDisplay>
          </InputPromptContainer>
          
          <ButtonRow>
            <Button secondary>Create Prompt</Button>
            <Button secondary>Find keywords</Button>
          </ButtonRow>
          
          <SectionTitle>Add keywords for rank</SectionTitle>
          <TextArea 
            height="80px" 
            placeholder="Paste Your Keywords Here..." 
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <CountDisplay>00/100</CountDisplay>
          
          <SectionTitle>Add Refrence Youtube Links</SectionTitle>
          <LinkInput 
            placeholder="Add YouTube Links Here..." 
            value={youtubeLinks}
            onChange={(e) => setYoutubeLinks(e.target.value)}
          />
          
          <SectionTitle>Language & Type & Industry</SectionTitle>
          <SelectRow>
            <Select 
              value={selectedLanguage} 
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="">Language</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </Select>
            <Select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Type</option>
              <option value="blog">Blog</option>
              <option value="script">Script</option>
              <option value="ad">Ad</option>
            </Select>
            <Select 
              value={selectedIndustry} 
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              <option value="">Industry</option>
              <option value="tech">Technology</option>
              <option value="health">Health</option>
              <option value="finance">Finance</option>
            </Select>
          </SelectRow>
          
          <TabsRow>
            <Tab active={activeTab === 'think'} onClick={() => setActiveTab('think')}>
              🧠 Think
            </Tab>
            <Tab active={activeTab === 'search'} onClick={() => setActiveTab('search')}>
              <FaSearch /> Search
            </Tab>
            <Tab active={activeTab === 'dalle'} onClick={() => setActiveTab('dalle')}>
              DALL·E
            </Tab>
          </TabsRow>
          
          <Button primary fullWidth style={{ marginTop: '16px' }}>
            Generate script
          </Button>
        </LeftPanel>
        
        <RightPanel>
          <EditorHeader>
            <ScriptTitle>Here your script</ScriptTitle>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button secondary round>
                <FaHistory /> History
              </Button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Translate</span>
                <Select>
                  <option>English</option>
                </Select>
              </div>
            </div>
          </EditorHeader>
          
          <EditorToolbar>
            <FontSelector>
              <SizeSelector>23</SizeSelector>
              <FontName>
                Sego UI
                <FaChevronDown size={10} />
              </FontName>
            </FontSelector>
            
            <FormatButton title="Italic">
              <i>italic</i>
            </FormatButton>
            <FormatButton title="Bold">
              <b>B</b>
            </FormatButton>
            <FormatButton>
              <FaListOl />
            </FormatButton>
            <FormatButton>
              <FaListUl />
            </FormatButton>
            <FormatButton>
              <FaLink />
            </FormatButton>
            <FormatButton>
              <BsThreeDots />
            </FormatButton>
          </EditorToolbar>
          
          <EditorContent>
            <ContentEditable 
              contentEditable 
              dangerouslySetInnerHTML={{ 
                __html: `Are you just getting started with Fantasy games? Whether it is fantasy cricket, fantasy football, fantasy kabaddi or fantasy basketball, having an understanding about the points system is the best way to selectmatches and get started with it.<br/><br/>The total points calculated for.Are you just getting started with Fantasy games? Whether it is fantasy cricket, fantasy football, fantasy kabaddi or fantasy basketball, having  an understanding about the points system is the best way to selectmatches and get started with it. The total points calculated for.<br/><br/><div style="background-color: #f0f0ff; padding: 8px; border: 1px solid #e0e0ff; border-radius: 4px;">Are you just getting started with Fantasy games? Whether it is fantasy cricket, fantasy football, fantasy kabaddi or fantasy basketball, having an understanding about the points system is the best way to selectmatches and get started with it.</div><br/>The total points calculated for.Are you just getting started with Fantasy games? Whether it is fantasy cricket, fantasy football, fantasy kabaddi or fantasy basketball, having  an understanding about the points system is the best way to selectmatches and get started with it. The total points calculated for.` 
              }}
              suppressContentEditableWarning={true}
            />
          </EditorContent>
          
          <ActionRow>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button secondary>
                <MdUnfoldLess /> Make it larger
              </Button>
              <Button secondary>
                <MdUnfoldMore /> Make it shorter
              </Button>
            </div>
            <Button secondary>
              <FaCopy /> Copy
            </Button>
          </ActionRow>
        </RightPanel>
      </PageContainer>
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', justifyContent: 'space-between' }}>
        <Button primary style={{ flex: 1 }}>
          Paraphrasing
        </Button>
        <Button primary style={{ flex: 1 }}>
          EXPORT (docs,pdf,etc)
        </Button>
      </div>
    </Layout>
  );
};

export default ScriptGenerator; 