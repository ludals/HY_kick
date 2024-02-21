const jwt = require('jsonwebtoken'); 
const { getKakaoUserInfo, findMemberBykakaoID, registerNewMember } = require('../../utils/kakaoAuth');

const mutationResolvers = {
    loginWithKakao: async ({ authorizationCode }) => {
        try {
          const kakaoUserInfo = await getKakaoUserInfo(authorizationCode);
          console.log("login", kakaoUserInfo)
          let member = await findMemberBykakaoID(kakaoUserInfo.id);
          if (member) {
            const tokenPayload = {
              id: member.id,
              name: member.name,
              email: member.email,
              position : member.position,
              student_number: member.student_number, 
              jersey_number:member.jersey_number
            };
            
            const secretKey = process.env.SECRET_KEY;
            const options = { expiresIn: '1h' };
      
            const jwtToken = jwt.sign(tokenPayload, secretKey, options);
            return {
              jwtToken,
            };
          } else {
            throw new Error("Member not found. Please register first.");
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
      registerOrAuthenticateUser: async ({authorizationCode, input : additionalInfo }) => {
        try {
          console.log(additionalInfo)
          const kakaoUserInfo = await getKakaoUserInfo(authorizationCode);
          console.log("카카오", kakaoUserInfo)
          let member = await findMemberBykakaoID(kakaoUserInfo.id);
          if (!member) {
            member = await registerNewMember(kakaoUserInfo, additionalInfo);
          }
    
          const tokenPayload = {
              id: member.id,
              name: member.name,
              email: member.email,
              position : member.position,
              student_number: member.student_number, 
              jersey_number:member.jersey_number
            };
            
            const secretKey = process.env.SECRET_KEY;
            const options = { expiresIn: '1h' };
      
            const jwtToken = jwt.sign(tokenPayload, secretKey, options);
            return {
              jwtToken,
            };
        } catch (error) {
          throw new Error(error.message);
        }
      },
};

module.exports = mutationResolvers;