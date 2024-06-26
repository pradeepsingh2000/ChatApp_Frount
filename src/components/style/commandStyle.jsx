import { Skeleton, keyframes, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";

export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: #00000021;
  }
`;

export const InputBox = styled('input')`
width:100%;
height:100%;
border:none;
outline:none;
padding: 0 3rem;
border-radius: 1.5rem;
`;
 const BouncingAnimation  = keyframes`
 0% {transform: scale(1);}
 50% {transform: scale(1.5);}
 100% {transform: scale(1);}
 `;
export const BouncingSkeleton = styled(Skeleton) (() => ({
  animation: `${BouncingAnimation} 1s infinite`
}))