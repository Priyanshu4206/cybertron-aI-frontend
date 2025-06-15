import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState, Modifier, SelectionState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { stateFromMarkdown } from 'draft-js-import-markdown';
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaRedo, FaUndo, FaHeading } from 'react-icons/fa';
import { MdFormatAlignLeft, MdFormatAlignCenter, MdFormatAlignRight } from 'react-icons/md';
import { fontSizes, fontFamilies } from '../../utils/scriptGeneratorData';

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
`;

const Toolbar = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  background: #f9f9f9;
  flex-wrap: wrap;
  gap: 5px;
`;

const ToolGroup = styled.div`
  display: flex;
  gap: 2px;
  margin-right: 10px;
  align-items: center;
`;

const ToolButton = styled.button`
  background: ${props => props.active ? '#e0e0e0' : 'transparent'};
  border: 1px solid ${props => props.active ? '#ccc' : 'transparent'};
  border-radius: 4px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background: #e0e0e0;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 24px;
  background: #e0e0e0;
  margin: 0 8px;
`;

const Select = styled.select`
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: white;
  font-size: 14px;
  min-width: 80px;
`;

const EditorWrapper = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  position: relative;
  
  .DraftEditor-root {
    height: 100%;
    min-height: 300px;
  }
  
  .public-DraftEditor-content {
    min-height: 300px;
    padding: 10px;
    font-size: ${props => props.fontSize || '16px'};
    font-family: ${props => props.fontFamily || 'Arial, sans-serif'};
    line-height: 1.6;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 1em;
    margin-bottom: 0.5em;
  }
  
  ul, ol {
    margin-left: 1.5em;
  }
`;

const ControlsBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-top: 1px solid #e0e0e0;
  background: #f9f9f9;
`;

const ControlButton = styled.button`
  background: ${props => props.primary ? '#000' : '#fff'};
  color: ${props => props.primary ? '#fff' : '#000'};
  border: 1px solid #000;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.primary ? '#333' : '#f0f0f0'};
  }
`;

const SelectionPopup = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 10px;
  z-index: 100;
  display: ${props => props.visible ? 'flex' : 'none'};
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
`;

const SelectionText = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
  max-height: 80px;
  overflow-y: auto;
  word-break: break-word;
`;

const SelectionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const SelectionButton = styled.button`
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background: ${props => props.primary ? '#000' : '#f0f0f0'};
  color: ${props => props.primary ? '#fff' : '#333'};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.primary ? '#333' : '#e0e0e0'};
  }
`;

const KeyComboBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 12px;
  color: #666;
  display: ${props => props.visible ? 'block' : 'none'};
`;

const ScriptEditor = ({ initialContent, onSave }) => {
  const [editorState, setEditorState] = useState(() => {
    if (initialContent) {
      // Check if content is markdown
      if (initialContent.startsWith('#') || initialContent.includes('##')) {
        return EditorState.createWithContent(stateFromMarkdown(initialContent));
      }
      // Check if content is HTML
      else if (initialContent.includes('<')) {
        return EditorState.createWithContent(stateFromHTML(initialContent));
      }
      // Otherwise treat as plain text
      else {
        return EditorState.createWithContent(ContentState.createFromText(initialContent));
      }
    }
    return EditorState.createEmpty();
  });
  
  const [fontSize, setFontSize] = useState('16px');
  const [fontFamily, setFontFamily] = useState('Arial, sans-serif');
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [selectionPopupVisible, setSelectionPopupVisible] = useState(false);
  const [selectionPopupPosition, setSelectionPopupPosition] = useState({ top: 0, left: 0 });
  const [selectedText, setSelectedText] = useState('');
  const [keyComboPressed, setKeyComboPressed] = useState(false);
  
  const editor = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    // Save current state to undo stack when editor state changes
    const currentContent = editorState.getCurrentContent();
    const contentRaw = convertToRaw(currentContent);
    
    // Only add to undo stack if content has changed
    if (undoStack.length === 0 || 
        JSON.stringify(contentRaw) !== JSON.stringify(undoStack[undoStack.length - 1])) {
      setUndoStack(prev => [...prev, contentRaw]);
      // Clear redo stack when new changes are made
      setRedoStack([]);
    }
  }, [editorState]);

  useEffect(() => {
    // Add event listener for key combinations
    const handleKeyDown = (e) => {
      // Check for Alt+Q key combination (Alt+Q for Selection)
      if (e.altKey && e.key === 'q') {
        e.preventDefault();
        console.log("this happened");
        handleKeyCombo();
      }
      
      // Close popup on Escape key
      if (e.key === 'Escape') {
        setSelectionPopupVisible(false);
        setKeyComboPressed(false);
      }
    };
    
    // Add click outside listener to close popup
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setSelectionPopupVisible(false);
        setKeyComboPressed(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyCombo = () => {
    const selection = editorState.getSelection();
    
    if (!selection.isCollapsed()) {
      // Get selected text
      const selectedText = getSelectedText(editorState);
      
      if (selectedText) {
        // Get selection coordinates to position the popup
        const selectionRect = getSelectionCoordinates();
        
        if (selectionRect) {
          setSelectedText(selectedText);
          setSelectionPopupPosition({
            top: selectionRect.bottom + window.scrollY,
            left: selectionRect.left + window.scrollX
          });
          setSelectionPopupVisible(true);
          setKeyComboPressed(true);
        }
      }
    } else {
      setSelectionPopupVisible(false);
      setKeyComboPressed(false);
    }
  };

  // Get selection coordinates
  const getSelectionCoordinates = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      return range.getBoundingClientRect();
    }
    return null;
  };

  const focusEditor = () => {
    if (editor.current) {
      editor.current.focus();
    }
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleUndo = () => {
    if (undoStack.length > 1) {
      // Get the previous state
      const prevState = undoStack[undoStack.length - 2];
      // Add current state to redo stack
      setRedoStack(prev => [...prev, undoStack[undoStack.length - 1]]);
      // Remove current state from undo stack
      setUndoStack(prev => prev.slice(0, prev.length - 1));
      // Set editor state to previous state
      setEditorState(EditorState.createWithContent(convertFromRaw(prevState)));
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      // Get the last redo state
      const redoState = redoStack[redoStack.length - 1];
      // Add it to undo stack
      setUndoStack(prev => [...prev, redoState]);
      // Remove it from redo stack
      setRedoStack(prev => prev.slice(0, prev.length - 1));
      // Set editor state to redo state
      setEditorState(EditorState.createWithContent(convertFromRaw(redoState)));
    }
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleFontFamilyChange = (e) => {
    setFontFamily(e.target.value);
  };

  const handleParaphrasing = () => {
    // In a real app, this would call an API
    // For now, we'll just simulate a response
    alert('Paraphrasing feature would call an API in a production environment');
    
    // Simulating a paraphrased response
    setTimeout(() => {
      const currentText = editorState.getCurrentContent().getPlainText();
      const paraphrasedText = `I've paraphrased: ${currentText.substring(0, 50)}...`;
      
      // Create new content state with paraphrased text
      const newContentState = ContentState.createFromText(paraphrasedText);
      setEditorState(EditorState.createWithContent(newContentState));
    }, 1000);
  };

  const handleExport = () => {
    const contentState = editorState.getCurrentContent();
    const html = stateToHTML(contentState);
    
    // Create a Blob with the HTML content
    const blob = new Blob([html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    
    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'script.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper function to get selected text
  const getSelectedText = (editorState) => {
    const selectionState = editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = editorState.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();
    const selectedText = currentContentBlock.getText().slice(start, end);
    return selectedText;
  };

  // Helper function to replace text
  const replaceSelectedText = (newText) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const newContentState = Modifier.replaceText(
      contentState,
      selection,
      newText
    );
    
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-characters'
    );
    
    setEditorState(newEditorState);
    setSelectionPopupVisible(false);
    setKeyComboPressed(false);
  };

  const handleMakeLarger = () => {
    // In a real app, this would call an API to expand the text
    // For now, we'll simulate an expanded version
    const expandedText = `${selectedText} (expanded with more details and context to provide a more comprehensive explanation with additional supporting information and examples)`;
    replaceSelectedText(expandedText);
  };

  const handleMakeShorter = () => {
    // In a real app, this would call an API to shorten the text
    // For now, we'll simulate a shortened version
    const shortenedText = selectedText.split(' ').slice(0, Math.max(3, Math.floor(selectedText.split(' ').length / 3))).join(' ') + '...';
    replaceSelectedText(shortenedText);
  };

  const currentBlockType = editorState
    .getCurrentContent()
    .getBlockForKey(editorState.getSelection().getStartKey())
    .getType();

  const currentInlineStyle = editorState.getCurrentInlineStyle();

  return (
    <EditorContainer onClick={focusEditor}>
      <Toolbar>
        <ToolGroup>
          <ToolButton 
            onClick={() => toggleBlockType('header-one')}
            active={currentBlockType === 'header-one'}
            title="Heading 1"
          >
            <FaHeading />1
          </ToolButton>
          <ToolButton 
            onClick={() => toggleBlockType('header-two')}
            active={currentBlockType === 'header-two'}
            title="Heading 2"
          >
            <FaHeading />2
          </ToolButton>
        </ToolGroup>
        
        <Divider />
        
        <ToolGroup>
          <ToolButton 
            onClick={() => toggleInlineStyle('BOLD')}
            active={currentInlineStyle.has('BOLD')}
            title="Bold"
          >
            <FaBold />
          </ToolButton>
          <ToolButton 
            onClick={() => toggleInlineStyle('ITALIC')}
            active={currentInlineStyle.has('ITALIC')}
            title="Italic"
          >
            <FaItalic />
          </ToolButton>
          <ToolButton 
            onClick={() => toggleInlineStyle('UNDERLINE')}
            active={currentInlineStyle.has('UNDERLINE')}
            title="Underline"
          >
            <FaUnderline />
          </ToolButton>
        </ToolGroup>
        
        <Divider />
        
        <ToolGroup>
          <ToolButton 
            onClick={() => toggleBlockType('unordered-list-item')}
            active={currentBlockType === 'unordered-list-item'}
            title="Bullet List"
          >
            <FaListUl />
          </ToolButton>
          <ToolButton 
            onClick={() => toggleBlockType('ordered-list-item')}
            active={currentBlockType === 'ordered-list-item'}
            title="Numbered List"
          >
            <FaListOl />
          </ToolButton>
        </ToolGroup>
        
        <Divider />
        
        <ToolGroup>
          <ToolButton 
            onClick={() => toggleBlockType('left')}
            active={currentBlockType === 'left'}
            title="Align Left"
          >
            <MdFormatAlignLeft />
          </ToolButton>
          <ToolButton 
            onClick={() => toggleBlockType('center')}
            active={currentBlockType === 'center'}
            title="Align Center"
          >
            <MdFormatAlignCenter />
          </ToolButton>
          <ToolButton 
            onClick={() => toggleBlockType('right')}
            active={currentBlockType === 'right'}
            title="Align Right"
          >
            <MdFormatAlignRight />
          </ToolButton>
        </ToolGroup>
        
        <Divider />
        
        <ToolGroup>
          <ToolButton 
            onClick={handleUndo}
            disabled={undoStack.length <= 1}
            title="Undo"
          >
            <FaUndo />
          </ToolButton>
          <ToolButton 
            onClick={handleRedo}
            disabled={redoStack.length === 0}
            title="Redo"
          >
            <FaRedo />
          </ToolButton>
        </ToolGroup>
        
        <Divider />
        
        <ToolGroup>
          <Select value={fontSize} onChange={handleFontSizeChange}>
            {fontSizes.map(size => (
              <option key={size.value} value={size.value}>{size.label}</option>
            ))}
          </Select>
        </ToolGroup>
        
        <ToolGroup>
          <Select value={fontFamily} onChange={handleFontFamilyChange}>
            {fontFamilies.map(font => (
              <option key={font.value} value={font.value}>{font.label}</option>
            ))}
          </Select>
        </ToolGroup>
      </Toolbar>
      
      <EditorWrapper fontSize={fontSize} fontFamily={fontFamily}>
        <KeyComboBadge visible={keyComboPressed}>
          Alt+Q pressed
        </KeyComboBadge>
        
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          customStyleMap={{
            HIGHLIGHT: {
              backgroundColor: 'yellow',
            },
          }}
        />
        
        <SelectionPopup 
          visible={selectionPopupVisible} 
          ref={popupRef}
          style={{
            top: `${selectionPopupPosition.top}px`,
            left: `${selectionPopupPosition.left}px`
          }}
        >
          <SelectionText>{selectedText}</SelectionText>
          <SelectionButtons>
            <SelectionButton onClick={handleMakeShorter}>
              Make Shorter
            </SelectionButton>
            <SelectionButton primary onClick={handleMakeLarger}>
              Make Larger
            </SelectionButton>
          </SelectionButtons>
        </SelectionPopup>
      </EditorWrapper>
      
      <ControlsBar>
        <ControlButton onClick={handleParaphrasing}>
          Paraphrase
        </ControlButton>
        <ControlButton primary onClick={handleExport}>
          Export to DOC
        </ControlButton>
      </ControlsBar>
    </EditorContainer>
  );
};

export default ScriptEditor; 