const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8181;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Healthy Lives API 서버가 실행 중입니다.');
});

// 회원가입 라우트
app.post('/api/auth/register', (req, res) => {
  try {
    const { role, name, email, password } = req.body;
    
    // 데이터 유효성 검사
    if (!role || !name || !email || !password) {
      return res.status(400).json({
        error: '모든 필드를 입력해주세요.'
      });
    }
    
    // 여기에 실제 회원가입 로직 구현
    // 현재는 임시 응답만 보냄
    console.log('회원가입 요청:', req.body);
    
    // 클라이언트가 기대하는 응답 형식으로 변경
    res.status(201).json({
      success: true,
      authtoken: 'sample-jwt-token-' + Date.now(), // 클라이언트에서 확인하는 authtoken 추가
      user: { role, name, email }
    });
  } catch (error) {
    console.error('회원가입 오류:', error);
    res.status(500).json({
      error: '서버 오류가 발생했습니다.'
    });
  }
});

// 로그인 라우트
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 여기에 실제 로그인 로직 구현
    // 현재는 임시 응답만 보냄
    console.log('로그인 요청:', req.body);
    
    res.status(200).json({
      success: true,
      authtoken: 'sample-jwt-token-' + Date.now(),
      user: { email }
    });
  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(500).json({
      error: '서버 오류가 발생했습니다.'
    });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});