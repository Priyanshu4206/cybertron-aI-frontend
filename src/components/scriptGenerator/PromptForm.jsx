import React, { useState } from 'react';
import styled from 'styled-components';
import { scriptTemplates } from '../../utils/scriptGeneratorData';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 8px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const TextArea = styled.textarea`
  min-height: 120px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: ${props => props.count > 2000 ? 'red' : '#666'};
`;

const TemplateInfo = styled.div`
  background: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  margin-top: 8px;
`;

const TemplateTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 14px;
`;

const TemplateDescription = styled.p`
  margin: 0 0 12px 0;
  font-size: 13px;
  color: #666;
`;

const TemplateStructure = styled.ul`
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
`;

const TemplateStructureItem = styled.li`
  margin-bottom: 4px;
  
  strong {
    color: #333;
  }
  
  span {
    color: #666;
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
  margin-top: 16px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #333;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const PromptForm = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [title, setTitle] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };
  
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  
  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };
  
  const handleToneChange = (e) => {
    setTone(e.target.value);
  };
  
  const handleLengthChange = (e) => {
    setLength(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!prompt.trim() || !title.trim() || !selectedTemplate) {
      return;
    }
    
    setIsGenerating(true);
    
    // In a real app, this would call an API
    setTimeout(() => {
      onGenerate({
        prompt,
        title,
        template: selectedTemplate,
        tone,
        length
      });
      setIsGenerating(false);
    }, 1500);
  };
  
  // Get the selected template details
  const templateDetails = scriptTemplates.find(template => template.id === selectedTemplate);
  
  return (
    <FormContainer>
      <InputGroup>
        <Label htmlFor="title">Script Title</Label>
        <Input 
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title for your script"
        />
      </InputGroup>
      
      <InputGroup>
        <Label htmlFor="template">Script Template</Label>
        <Select 
          id="template"
          value={selectedTemplate}
          onChange={handleTemplateChange}
        >
          <option value="">Select a template</option>
          {scriptTemplates.map(template => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </Select>
        
        {templateDetails && (
          <TemplateInfo>
            <TemplateTitle>{templateDetails.name}</TemplateTitle>
            <TemplateDescription>{templateDetails.description}</TemplateDescription>
            <TemplateStructure>
              {templateDetails.structure.map((item, index) => (
                <TemplateStructureItem key={index}>
                  <strong>{item.name}:</strong> <span>{item.description}</span>
                </TemplateStructureItem>
              ))}
            </TemplateStructure>
          </TemplateInfo>
        )}
      </InputGroup>
      
      <InputGroup>
        <Label htmlFor="prompt">Script Description</Label>
        <TextArea 
          id="prompt"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Describe what you want in your script..."
        />
        <CharCount count={prompt.length}>
          {prompt.length}/2000
        </CharCount>
      </InputGroup>
      
      <InputGroup>
        <Label htmlFor="tone">Tone</Label>
        <Select 
          id="tone"
          value={tone}
          onChange={handleToneChange}
        >
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="humorous">Humorous</option>
          <option value="formal">Formal</option>
          <option value="inspirational">Inspirational</option>
          <option value="educational">Educational</option>
        </Select>
      </InputGroup>
      
      <InputGroup>
        <Label htmlFor="length">Length</Label>
        <Select 
          id="length"
          value={length}
          onChange={handleLengthChange}
        >
          <option value="short">Short (2-3 minutes)</option>
          <option value="medium">Medium (5-7 minutes)</option>
          <option value="long">Long (10+ minutes)</option>
        </Select>
      </InputGroup>
      
      <GenerateButton 
        onClick={handleSubmit}
        disabled={!prompt.trim() || !title.trim() || !selectedTemplate || isGenerating}
      >
        {isGenerating ? 'Generating...' : 'Generate Script'}
      </GenerateButton>
    </FormContainer>
  );
};

export default PromptForm; 