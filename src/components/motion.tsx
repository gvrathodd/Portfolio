import React from 'react';

/** Feeds the pointer position to `.spotlight` as CSS variables, without re-rendering. */
export const trackPointer = (e: React.PointerEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  el.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

/** Splits text into words that slide up from a mask once an ancestor gets `.is-shown`. */
export const MaskWords: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(' ').map((word, i, words) => (
      <React.Fragment key={i}>
        <span className="mask-word">
          <span style={{ '--w': i } as React.CSSProperties}>{word}</span>
        </span>
        {i < words.length - 1 && ' '}
      </React.Fragment>
    ))}
  </>
);
