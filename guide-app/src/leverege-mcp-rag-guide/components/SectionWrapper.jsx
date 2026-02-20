import React from 'react';

export const SectionWrapper = ({ children, title, eyebrow }) => {
    return (
        <div style={{
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#374151'
        }}>
            {(title || eyebrow) && (
                <div style={{ marginBottom: '36px' }}>
                    {eyebrow && (
                        <div style={{ marginBottom: '12px' }}>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                fontSize: '11px',
                                fontWeight: 700,
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                padding: '3px 10px',
                                borderRadius: '100px',
                                background: '#EBF1FF',
                                color: '#0056D2'
                            }}>
                                {eyebrow}
                            </span>
                        </div>
                    )}
                    {title && (
                        <h1 style={{
                            fontSize: '28px',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.2,
                            color: '#111827',
                            marginBottom: '10px'
                        }}>
                            {title}
                        </h1>
                    )}
                </div>
            )}
            <div style={{
                fontSize: '15px',
                lineHeight: '1.7'
            }}>
                {children}
            </div>
        </div>
    );
};
