import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { lg } from "../BreakPoints";

// Styled component for the logo
const Logo = styled.img`
  height: 9rem; /* Adjust the height as needed */
  margin-right: 1rem; /* Add margin for spacing */
`;

const Container = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  z-index: 100;

  ${lg({
    justifyContent: "space-between",
  })}
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Link = styled.a`
  text-decoration: underline;
  cursor: pointer;
  color: #0952cc;
`;

const Button = styled.button`
  background-color: #0065ff;
  border-radius: 0.4rem;
  padding: 0.5rem 1rem;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0952cc;
  }
`;

const IndexNav = () => {
  let history = useHistory();
  return (
    <Container>
      {/* Logo added here */}
      <Logo src="https://i.postimg.cc/tTCkfVm0/TEch-Tasker-1000-x-500-px-2.png" alt="Tech Tasker Logo" />

      <RightSide>
        <Link onClick={() => history.push("/login")}>Log in</Link>
        <Button onClick={() => history.push("/register")}>Sign up</Button>
      </RightSide>
    </Container>
  );
};

export default IndexNav;
