import styled from 'styled-components'
import { MdArrowDownward } from 'react-icons/md'
import { MdArrowUpward } from 'react-icons/md'
import { motion } from 'framer-motion'

export const Wrapper = styled.div`
  padding: 20px;
  background-color: var(--blue);
`

export const Button = styled(motion.button)`
  padding: 20px 40px;
  background-color: transparent;
  border-radius: 20px;
  border: 3px solid var(--dark);
  display: inline-flex;
  align-items: center;
  font-size: 20px;
  gap: 10px;
  font-weight: 900;
`

export const DownIcon = styled(MdArrowDownward)`
  font-size: 20px;
`
export const UpIcon = styled(MdArrowUpward)`
  font-size: 20px;
`
