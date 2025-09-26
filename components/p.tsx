{
  "file": "src/components/StyledParagraph.tsx",
  "content": "import React from 'react';\n\ninterface Props {\n  children?: React.ReactNode;\n}\n\nconst StyledParagraph: React.FC<Props> = ({ children }) => (\n  <p style={{ fontSize: '30px' }}>{children}</p>\n);\n\nexport default StyledParagraph;\n"
}