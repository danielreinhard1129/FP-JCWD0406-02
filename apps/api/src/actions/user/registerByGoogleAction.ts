// export const getTokens = async (
//   code: string
// ): Promise<Credentials | undefined> => {
//   try {
//     const oAuth2Client = new OAuth2Client(
//       process.env.GOOGLE_CLIENT_ID,
//       process.env.GOOGLE_CLIENT_SECRET,
//       "postmessage"
//     );

//     const { tokens } = await oAuth2Client.getToken(code);

//     return tokens;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const registerByGoogleAction = async (data: string) => {
  try {
    // const oAuth2Client = new OAuth2Client(
    //   process.env.GOOGLE_CLIENT_ID,
    //   process.env.GOOGLE_CLIENT_SECRET,
    //   'postmessage',
    // );
  } catch (error) {
    throw error;
  }
};
