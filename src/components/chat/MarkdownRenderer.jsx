import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownContainer = styled.div`
  font-size: 0.9rem;
  line-height: 1.4;
  color: #333;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const TypingCursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background-color: #333;
  margin-left: 2px;
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

const MarkdownRenderer = ({ 
  content, 
  isTyping = false, 
  typingSpeed = 15, // milliseconds per character - much faster for realistic typing
  onTypingComplete = null 
}) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const typingRef = useRef(null);

  useEffect(() => {
    if (!isTyping) {
      // If not typing, show content immediately
      setDisplayedContent(content);
      setIsTypingComplete(true);
      if (onTypingComplete) onTypingComplete();
      return;
    }

    // Reset for new content
    setDisplayedContent('');
    setIsTypingComplete(false);

    let currentIndex = 0;
    const contentLength = content.length;

    const typeNextCharacter = () => {
      if (currentIndex < contentLength) {
        setDisplayedContent(content.slice(0, currentIndex + 1));
        currentIndex++;
        typingRef.current = setTimeout(typeNextCharacter, typingSpeed);
      } else {
        setIsTypingComplete(true);
        if (onTypingComplete) onTypingComplete();
      }
    };

    // Start typing animation
    typingRef.current = setTimeout(typeNextCharacter, typingSpeed);

    // Cleanup on unmount or content change
    return () => {
      if (typingRef.current) {
        clearTimeout(typingRef.current);
      }
    };
  }, [content, isTyping, typingSpeed, onTypingComplete]);

  // Custom components for ReactMarkdown
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <MarkdownContainer>
      <ReactMarkdown components={components}>
        {displayedContent}
      </ReactMarkdown>
      {isTyping && !isTypingComplete && <TypingCursor />}
    </MarkdownContainer>
  );
};

export default MarkdownRenderer; 