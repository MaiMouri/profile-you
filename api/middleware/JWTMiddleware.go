package middleware

import (
	"encoding/json"
	"fmt"
	"net/http"
	"profileyou/api/service"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func AuthorizeJWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		const BEARER_SCHEMA = "Bearer"
		authHeader := c.GetHeader("Authorization")

		// sanity check
		if authHeader == "" {
			c.JSON(http.StatusBadGateway, gin.H{"message": "no header"})
		}

		tokenString := authHeader[len(BEARER_SCHEMA):]
		token, err := service.JWTAuthService().ValidateToken(tokenString)
		if token.Valid {
			claims := token.Claims.(jwt.MapClaims)
			fmt.Println(claims)
		} else {
			fmt.Println(err)
			c.AbortWithStatus(http.StatusUnauthorized)
		}

	}
}

// func LoginCheckMiddleware() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		session := sessions.Default(c)
// 		// Json文字列がinterdace型で格納されている。dproxyのライブラリを使用して値を取り出す
// 		loginUserJson, err := dproxy.New(session.Get("loginUser")).String()

// 		if err != nil {
// 			c.Status(http.StatusUnauthorized)
// 			c.Abort()
// 		} else {
// 			var loginInfo model.AuthUser
// 			// Json文字列のアンマーシャル
// 			err := json.Unmarshal([]byte(loginUserJson), &loginInfo)
// 			if err != nil {
// 				c.Status(http.StatusUnauthorized)
// 				c.Abort()
// 			} else {
// 				c.Next()
// 			}
// 		}
// 	}
// }
