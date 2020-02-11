#!/usr/bin/env elixir

defmodule Script do
  def to_wordlist(file_name),
    do: File.read!(file_name) |> String.split("\n") |> Enum.map(&String.trim(&1)) |> Enum.map(&String.downcase(&1)) |> MapSet.new()

  def main() do
    verbs = to_wordlist("verblist.txt")
    nouns = to_wordlist("nounlist.txt")
    adjectives = to_wordlist("adjectivelist.txt")
    codenames = to_wordlist("codenames.txt")

    # Prep the output file
    {:ok, out} = File.open("output.json", [:write, :utf8])
    IO.puts(out, "{\"vectors\":{")

    # Stream the input line by line and fetch the header first
    File.stream!("glove.6B.300d.txt")
    |> Stream.filter(&Regex.match?(~r/^[[:lower:]]+\s/, &1))
    |> Stream.map(&String.split(&1, " "))
    |> Stream.filter(fn [word | _] ->
      (MapSet.member?(verbs, word) ||
      MapSet.member?(nouns, word) ||
      MapSet.member?(adjectives, word) ||
      MapSet.member?(codenames, word))
    end)
    |> Stream.map(fn [word | vec] ->
      [String.downcase(word) | vec]
    end)
    |> Stream.map(fn [word | vec] ->
      "\"#{word}\": [#{Enum.join(vec, ",")}]"
    end)
    |> Stream.intersperse(",\n")
    |> Stream.each(fn string ->
      IO.write(out, string)
    end)
    |> Stream.run()

    # Finish streaming and end the JSON
    IO.puts(out, "\n}}")
    File.close(out)
  end
end

Script.main()
