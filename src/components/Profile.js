import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile() {
  // 사용자 정보 상태
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    medicalHistory: '',
  });

  // 편집 모드 상태
  const [isEditing, setIsEditing] = useState(false);
  // 임시 수정 데이터
  const [editData, setEditData] = useState({});
  // 저장 메시지 상태
  const [saveMessage, setSaveMessage] = useState('');

  // 컴포넌트 마운트 시 세션 스토리지에서 사용자 정보 가져오기
  useEffect(() => {
    const name = sessionStorage.getItem('name');
    const email = sessionStorage.getItem('email');
    const role = sessionStorage.getItem('role');
    
    // 기본 정보 설정
    if (name && email && role) {
      setUserData(prevState => ({
        ...prevState,
        name,
        email,
        role
      }));
    }

    // 추가 정보가 있다면 불러오기
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      setUserData(prevState => ({
        ...prevState,
        ...parsedData
      }));
    }
  }, []);

  // 편집 모드 시작
  const handleEdit = () => {
    setEditData({...userData});
    setIsEditing(true);
  };

  // 입력 필드 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // 변경 사항 저장
  const handleSave = () => {
    // 유효성 검사 (필요시 추가)
    
    // 사용자 데이터 업데이트
    const updatedUserData = {...userData, ...editData};
    setUserData(updatedUserData);
    
    // 로컬 스토리지에 저장
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    
    // 편집 모드 종료
    setIsEditing(false);
    
    // 저장 메시지 표시
    setSaveMessage('프로필이 성공적으로 저장되었습니다.');
    setTimeout(() => {
      setSaveMessage('');
    }, 3000);
  };

  // 편집 취소
  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">내 프로필</h2>
      
      {saveMessage && (
        <div className="save-message">{saveMessage}</div>
      )}
      
      <div className="profile-card">
        {!isEditing ? (
          // 프로필 보기 모드
          <>
            <div className="profile-avatar">
              <span className="avatar-text">{userData.name ? userData.name.charAt(0).toUpperCase() : '?'}</span>
            </div>
            
            <div className="profile-details">
              <div className="profile-field">
                <strong>이름:</strong> {userData.name || '미설정'}
              </div>
              <div className="profile-field">
                <strong>이메일:</strong> {userData.email || '미설정'}
              </div>
              <div className="profile-field">
                <strong>역할:</strong> {userData.role || '미설정'}
              </div>
              <div className="profile-field">
                <strong>나이:</strong> {userData.age || '미설정'}
              </div>
              <div className="profile-field">
                <strong>성별:</strong> {userData.gender || '미설정'}
              </div>
              <div className="profile-field">
                <strong>전화번호:</strong> {userData.phone || '미설정'}
              </div>
              <div className="profile-field">
                <strong>주소:</strong> {userData.address || '미설정'}
              </div>
              <div className="profile-field">
                <strong>병력:</strong> 
                <p className="medical-history">{userData.medicalHistory || '미설정'}</p>
              </div>
            </div>
            
            <button className="edit-button" onClick={handleEdit}>
              프로필 수정
            </button>
          </>
        ) : (
          // 프로필 편집 모드
          <div className="profile-edit-form">
            <div className="form-group">
              <label>이름:</label>
              <input 
                type="text" 
                name="name" 
                value={editData.name || ''} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>이메일:</label>
              <input 
                type="email" 
                name="email" 
                value={editData.email || ''} 
                onChange={handleChange}
                disabled // 이메일은 변경 불가능하도록 설정
              />
            </div>
            
            <div className="form-group">
              <label>역할:</label>
              <input 
                type="text" 
                name="role" 
                value={editData.role || ''} 
                onChange={handleChange}
                disabled // 역할은 변경 불가능하도록 설정
              />
            </div>
            
            <div className="form-group">
              <label>나이:</label>
              <input 
                type="number" 
                name="age" 
                value={editData.age || ''} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>성별:</label>
              <select 
                name="gender" 
                value={editData.gender || ''} 
                onChange={handleChange}
              >
                <option value="">선택하세요</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
                <option value="other">기타</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>전화번호:</label>
              <input 
                type="tel" 
                name="phone" 
                value={editData.phone || ''} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>주소:</label>
              <input 
                type="text" 
                name="address" 
                value={editData.address || ''} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>병력:</label>
              <textarea 
                name="medicalHistory" 
                value={editData.medicalHistory || ''} 
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>
            
            <div className="button-group">
              <button className="save-button" onClick={handleSave}>저장</button>
              <button className="cancel-button" onClick={handleCancel}>취소</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
