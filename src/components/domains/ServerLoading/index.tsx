import { useRouter } from 'next/router';
import styled from '@emotion/styled';

const ServerLoading = () => {
  const router = useRouter();

  const handleTextClick = () => {
    router.push('/detail/9');
  };

  return (
    <Container>
      <div>Render 서버가 깨어나는 중입니다...</div>
      <div>
        이미 만들어진 정적 페이지를 확인하시려면
        <StyledSpan onClick={handleTextClick}>여기</StyledSpan>를 클릭해주세요!
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  font-size: 16px;
  font-weight: 600;
`;

const StyledSpan = styled.span`
  font-size: 20px;
  font-weight: 800;
  margin: 0 10px;
  color: green;
  cursor: pointer;
  border: 1px solid black;
  &:hover {
    color: blue;
  }
`;

export default ServerLoading;
