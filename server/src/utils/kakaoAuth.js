const axios = require('axios');
const db = require('../../db');

const REST_API_KEY = '531ad8ca7724886e585bdd16b39a39bc';
const REDIRECT_URI = 'http://localhost:3000/auth';

async function getKakaoUserInfo(authorizationCode) {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', REST_API_KEY);
    params.append('redirect_uri', REDIRECT_URI);
    params.append('code', authorizationCode);
  
    const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', params);
    const accessToken = tokenResponse.data.access_token;
  
    const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    return {
      accessToken,
      refreshToken: tokenResponse.data.refresh_token,
      ...userInfoResponse.data,
    };
  }

  async function findMemberBykakaoID(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM members WHERE member_id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  async function registerNewMember(kakaoUserInfo, additionalInfo) {
    const { id, properties, kakao_account } = kakaoUserInfo;
    const { 
      name,
      student_number,
      team_id,
      position,
      jersey_number }= additionalInfo;
  
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO members (kakao_id, name, team_id, position, student_number, jersey_number) VALUES (?, ?, ?, ?, ?, ?)',
        [id, name, team_id, position, student_number, jersey_number], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              member_id: results.insertId,
              name: name,
              team_id: team_id,
              position: position,
              student_number: student_number,
              jersey_number: jersey_number
            });
          }
        }
      );
    });
  }

  module.exports = { getKakaoUserInfo, findMemberBykakaoID, registerNewMember };
