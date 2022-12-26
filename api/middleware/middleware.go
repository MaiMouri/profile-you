package middleware

import (
	"fmt"
	"net/http"
	"os"
	"profileyou/api/domain/model/user"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func AuthorizeJWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("----------In middleware----------")

		authHeader := c.Request.Header.Get("Authorization")
		fmt.Printf("authHeader: %v\n", authHeader)

		headerParts := strings.Split(authHeader, " ")
		fmt.Printf("headerParts: %v\n", headerParts)

		ProvidedToken := headerParts[1]
		fmt.Printf("token sent via api: %v\n", ProvidedToken)

		// tokenString, err := c.Cookie("Authorization")
		// fmt.Printf("tokenString: %v\n", tokenString)

		// if err != nil {
		// 	c.AbortWithStatus(http.StatusUnauthorized)
		// }
		// Decode/validate it

		// Parse thakes the token string and a function for looking up the key.
		token, _ := jwt.Parse(ProvidedToken, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
			}

			return []byte(os.Getenv("SECRET_KEY")), nil
		})

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			// check the exp
			if float64(time.Now().Unix()) > claims["exp"].(float64) {
				c.AbortWithStatus(http.StatusUnauthorized)
			}

			// Find the user with token sub
			var user user.User
			db, _ := gorm.Open(sqlite.Open("mvc.db"), &gorm.Config{})
			db.First(&user, claims["user_id"])
			fmt.Printf("user: %v\n", user)

			if user.Email == "" {
				c.AbortWithStatus(http.StatusUnauthorized)
			}

			c.Set("user", user)
			c.Set("userToken", ProvidedToken)

			// Continue
			c.Next()

		} else {
			c.AbortWithStatus(http.StatusUnauthorized)
		}
	}
}

type SignedDetails struct {
	Email string
	jwt.StandardClaims
}

var SECRET_KEY string = os.Getenv("SECRET_KEY")

func ValidateToken(signedToken string) (claims *SignedDetails, msg string) {
	token, err := jwt.ParseWithClaims(
		signedToken,
		&SignedDetails{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(SECRET_KEY), nil
		},
	)

	if err != nil {
		msg = err.Error()
		return
	}

	claims, ok := token.Claims.(*SignedDetails)
	if !ok {
		msg = fmt.Sprintf("the token is invalid")
		msg = err.Error()
		return
	}

	if claims.ExpiresAt < time.Now().Local().Unix() {
		msg = fmt.Sprintf("the token is expired")
		msg = err.Error()
		return
	}
	return claims, msg
}
