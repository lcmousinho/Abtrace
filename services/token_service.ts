export class tokenService {
    async getToken(page){
        var accessTokenObj = await page.evaluate(() => {
            return localStorage.getItem("CognitoIdentityServiceProvider.39dmjgvttdd61ahqu19m3n4dsf.luiz.idToken");
        });
        return accessTokenObj;
          
    }
};