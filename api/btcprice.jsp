<%@ page session="false" pageEncoding="UTF-8" contentType="application/json; charset=UTF-8" %>
<%@ page import="java.io.BufferedReader,java.io.InputStream,java.io.InputStreamReader" %>
<%@ page import="java.net.HttpURLConnection,java.net.URL" %>
<%@ page import="java.nio.charset.StandardCharsets" %>
<%@ page import="java.util.regex.Matcher,java.util.regex.Pattern" %>
<%
String apiUrl = "https://api.coindesk.com/v1/bpi/currentprice/USD.json";
String price = "0";

try {
  URL url = new URL(apiUrl);
  HttpURLConnection connection = (HttpURLConnection) url.openConnection();
  connection.setRequestMethod("GET");
  connection.setConnectTimeout(5000);
  connection.setReadTimeout(5000);

  int status = connection.getResponseCode();
  InputStream stream = (status >= 200 && status < 300) ? connection.getInputStream() : connection.getErrorStream();
  StringBuilder responseBody = new StringBuilder();

  if (stream != null) {
    try (BufferedReader reader = new BufferedReader(new InputStreamReader(stream, StandardCharsets.UTF_8))) {
      String line;
      while ((line = reader.readLine()) != null) {
        responseBody.append(line);
      }
    }
  }

  String body = responseBody.toString();
  Matcher matcher = Pattern.compile("\\\"rate_float\\\"\\s*:\\s*([0-9.]+)").matcher(body);
  if (matcher.find()) {
    price = matcher.group(1);
  }

  connection.disconnect();
} catch (Exception e) {
  price = "0";
}
%>
{
  "price": <%=price%>
}
