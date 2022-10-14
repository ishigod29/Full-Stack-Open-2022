import styled from 'styled-components'
import { MdThumbUp } from 'react-icons/md'

export const  Title = styled.h1`
    font-size: 50px;
`

export const Button = styled.button`
    padding: 20px;
    background-color: var(--red);
    border-radius: 20px;
    border: 3px solid var(--dark);
    font-weight: 800;
    font-size: 20px;
`

export const Ancor = styled.a`
    display: block;
    color: var(--red);
`

export const Text = styled.p`
    font-size: 20px;
    font-weight: 800;
`

export const LikeContainer = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 20px;
`

export const IconLike = styled(MdThumbUp)`
    font-size: 20px;
`

export const ButtonLike = styled.button`
    padding: 10px;
    width: 50px;
    height: 50px;
    background-color: var(--blue);
    border-radius: 100%;
    border: none;
`