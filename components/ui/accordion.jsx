import React, { useState, createContext, useContext } from 'react';
import styles from './accordion.module.css';

const AccordionContext = createContext(null);

export function Accordion({ children, type, collapsible, defaultValue, className }) {
  const [value, setValue] = useState(defaultValue);

  const toggleItem = (itemValue) => {
    if (type === 'single') {
      setValue(prev => (prev === itemValue && collapsible ? null : itemValue));
    } else {
      // Multiple support could be added here if needed
    }
  };

  return (
    <AccordionContext.Provider value={{ value, toggleItem }}>
      <div className={`${styles.accordion} ${className || ''}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ children, value, className }) {
  return (
    <div className={`${styles.item} ${className || ''}`} data-state={useContext(AccordionContext).value === value ? 'open' : 'closed'}>
      {React.Children.map(children, child => 
        React.cloneElement(child, { itemValue: value })
      )}
    </div>
  );
}

export function AccordionTrigger({ children, itemValue, className }) {
  const { value, toggleItem } = useContext(AccordionContext);
  const isOpen = value === itemValue;

  return (
    <button
      className={`${styles.trigger} ${className || ''}`}
      onClick={() => toggleItem(itemValue)}
      data-state={isOpen ? 'open' : 'closed'}
    >
      {children}
      <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
    </button>
  );
}

export function AccordionContent({ children, itemValue, className }) {
  const { value } = useContext(AccordionContext);
  const isOpen = value === itemValue;

  if (!isOpen) return null;

  return (
    <div className={`${styles.content} ${className || ''}`} data-state={isOpen ? 'open' : 'closed'}>
      <div className={styles.contentInner}>
        {children}
      </div>
    </div>
  );
}
