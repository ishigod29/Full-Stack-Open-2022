import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Alert = styled(motion.div)`
  background-color: var(--blue);
  border-radius: 0px 0px 20px 20px;
  padding: 20px;
  position: absolute;
  width: 100%;
  top: 0;
`

export const AlertError = styled(Alert)`
  background-color: var(--yellow);
`
