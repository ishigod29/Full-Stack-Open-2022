import styled from 'styled-components'
import { MdArrowForward } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export const Card = styled(motion.div)`
  padding: 20px;
  border: 3px solid var(--dark);
  border-radius: 20px;
`

export const SubTitle = styled.h2`
  font-size: 40px;
`

export const Blogs = styled.section`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const BlogLink = styled(Link)`
  text-decoration: none;
  color: var(--dark);
  display: inline-flex;
  align-items: center;

  &:hover{
    color: var(--red);
  }
`

export const GoIcon = styled(MdArrowForward)`
  font-size: 20px;
`
