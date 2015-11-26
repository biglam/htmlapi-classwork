require 'pry-byebug'
require 'sinatra'
require 'sinatra/contrib/all' if development?
require 'yahoofinance'
require 'json'

get '/' do
  @values = {}
  erb :index
end

post '/' do
  redirect to("/#{params['stock_symbol']}")
end

get '/:stock_symbol' do
  quote = YahooFinance::get_standard_quotes(params[:stock_symbol])[params[:stock_symbol]]
  @values = { updatedAt: DateTime.now }

  [:symbol, :name, :date, :time, :lastTrade].each { |s| @values[s] = quote.send s }

  if request.xhr?
    [200, { "Content-Type" => "application/json" }, JSON.generate(@values)]
  else
    erb :quote
  end
end
