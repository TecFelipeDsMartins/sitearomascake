import React, { useState, createContext, useContext, useEffect } from 'react';
import styles from './accordion.module.css';

const AccordionContext = createContext(null);

export function Accordion({ children, type, collapsible, defaultValue, className }) {
  const [value, setValue] = useState(defaultValue);
  const [mounted, setMounted] = useState(false);

  // Garante que o estado só seja processado após o mount no cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleItem = (itemValue) => {
    if (type === 'single') {
      setValue(prev => (prev === itemValue && collapsible ? null : itemValue));
    }
  };

  return (
    <AccordionContext.Provider value={{ value, toggleItem, mounted }}>
      <div className={`${styles.accordion} ${className || ''}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ children, value, className }) {
  return (
    <div 
      className={`${styles.item} ${className || ''}`} 
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { itemValue: value });
        }
        return child;
      })}
    </div>
  );
}

export function AccordionTrigger({ children, itemValue, className }) {
  const { value, toggleItem, mounted } = useContext(AccordionContext);
  const isOpen = mounted && value === itemValue;

  return (
    <button
      className={`${styles.trigger} ${className || ''}`}
      onClick={() => toggleItem(itemValue)}
      data-state={isOpen ? 'open' : 'closed'}
      type="button"
    >
      {children}
      <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
    </button>
  );
}

export function AccordionContent({ children, itemValue, className }) {
  const { value, mounted } = useContext(AccordionContext);
  const isOpen = mounted && value === itemValue;

  return (
    <div 
      className={`${styles.content} ${className || ''}`} 
      data-state={isOpen ? 'open' : 'closed'}
      style={{ 
        display: isOpen ? 'block' : 'none',
        overflow: 'hidden'
      }}
    >
      <div className={styles.contentInner}>
        {children}
      </div>
    </div>
  );
}
