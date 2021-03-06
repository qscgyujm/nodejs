# Learn backend the hard way: Q2

Q2 研究「不使用任何框架或外部函式庫，只靠 node 內建的模組來實作簡單後端服務」

此題目的目標是：

- 了解 HTTP 流程的基礎
- 使用 node + http 寫基本程式

此題要實作的是：

此題分成數個部分。各個階段依照順序來做。

## Q2-1 實作一個簡單的伺服器

條件：只要 `GET /` 時可以回任何訊息即可

## Q2-2 實作一個伺服器

`GET /` 帶 GET Query，伺服器會回覆 Query 的內容。

通過條件：傳 `GET /?<string>=<string>` 時，伺服器會回覆 `<string>` 的內容

## Q2-3 上傳檔案

首先，先參考以下文件，了解 HTTP 協定基礎和 `multipart/form-data`。

- https://www.ntu.edu.sg/home/ehchua/programming/webprogramming/HTTP_Basics.html
- http://derpturkey.com/node-multipart-form-data-explained/

這題實作一個接收檔案的介面，使用 `multipart/form-data` 來收檔案，然後把檔案存到伺服器上面。

- 這題的表單必須要有兩個欄位，一個是檔案本身，另一個是檔案的檔名。
- 收到請求時，將檔案以表單中的檔名，儲存到伺服器上。儲存成功之後，伺服器回覆 HTTP 200。
- 可以使用外部函式庫，參考 `multer` 或 `form-data`。

可以使用 curl 來做測試：`curl -F 'file=@file.jpg' -F 'filename=file.jpg' <address>`

這題必須研究的是：

- `multipart/form-data` 在什麼狀況下會用到？
- 實作「接收檔案並儲存在伺服器上」，有沒有可能會有安全上的隱患？（hint: `../../../file.jpg` 和 [這份文件](https://www.owasp.org/index.php/Path_Traversal)）

## Q2-4 上傳檔案（進階）

延續前面一題，但限制使用者上傳的格式。

由於 node 並沒有內建此函式庫，所以使用 [file-type](https://github.com/sindresorhus/file-type) 來判斷 _file_「真正的格式」。
此題和前提內容類似，但限定使用者只能上傳 `.jpg` (mime: `image/jpeg`)。

測試方式：

- 上傳時，若 _file_ 的 MIME 不是 `image/jpeg`，伺服器必須回傳錯誤（status code=400）
- 上傳時，若 _file_ 的 MIME 是 `image/jpeg`，行為則和前一題相同

## Q2-5 回傳檔案

從伺服器上讀取某一個檔案，將此檔案回傳給客戶端。
這題配合 Q2-3/Q2-4，先上傳一份內容類似這樣的 HTML 檔，然後用下面的實作來讀這個檔。

```html
<html>
<script>alert('pwnd')</script>
</html>
```

使用者做 `GET` 請求時，帶一個參數，例如 `?file=pwn.html`。伺服器必須依據參數，回傳 `files/` 資料夾底下的某一檔案。
其回覆中 `Content-Type` 必須和那個檔案的 MIME 格式相等，回覆內容為那個檔案的內容。
所以，假設上傳的是上面那份 HTML，`Content-Type` 應該是 `text/html`。

問題：

- 和 Q2-3 一樣。你的實作，有沒有可能會有安全上的隱患？（參考資料亦同 Q2-3，但這題還有[別的安全問題](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS))）