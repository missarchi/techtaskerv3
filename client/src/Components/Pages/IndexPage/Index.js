import React, { useEffect } from "react";
import IndexNav from "../../IndexNav";
import { useHistory } from "react-router-dom";
import {
  Container,
  Content,
  LeftSide,
  RightSide,
  LeftWrapper,
  Title,
  Text,
  Button,
  SvgItem,
} from "./Styled";

const Index = () => {
  let history = useHistory();
  useEffect(() => {
    document.title = "Techtasker"
  }, [])
  return (
    <>
      <IndexNav />
      <Container>
        <Content>
          <LeftSide>
            <LeftWrapper>
              <Title>TechTasker helps teams move work forward.</Title>
              <Text>
                Collaborate, manage projects, and reach new productivity peaks.
                From high rises to the home office, the way your team works is
                unique—accomplish it all with TechTasker.
              </Text>
              <Button onClick={() => history.push("/register")}>
                Sign up - it's free
              </Button>
            </LeftWrapper>
          </LeftSide>
          <RightSide>
            <SvgItem src="https://tinypic.host/images/2024/03/28/intro.png" />
          </RightSide>
        </Content>
      </Container>
    </>
  );
};

export default Index;
