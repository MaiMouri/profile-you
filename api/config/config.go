package config

type Configlist struct {
	ApiKey string
}

//読み込んだAPIキー情報を格納する構造体

var Config Configlist

//構造体を変数に代入

// func init() {
// 	cfg, err := ini.Load("config.ini") //config.ini内の情報を読み込んで変数に代入
// 	if err != nil {
// 		log.Fatalf("failed to read file\n", err)
// 	}
// 	//エラーハンドリング
// 	Config = Configlist{
// 		ApiKey: cfg.Section("OPEN_API_KEY").Key("api_key").String(),
// 		// ApiKey: cfg.Section("API_FORCAST_KEY").Key("api_key").String(),
// 		//構造体のApiKeyフィールドにAPI_FORCAST_KEYセクションのapi_keyの値(APIキー)を入れる
// 	}
// }

const OPEN_API_KEY = "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"