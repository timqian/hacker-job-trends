## hacker-job-trends
As we know, an "Ask HN: Who is Hiring?"([example](https://news.ycombinator.com/item?id=17442187)) post will occur at hackernews every month. It is interesting to scan the post because it helps you to get a feeling about what is happening in tec related busness. Aim of this repo is to give you a feeling about how the tec job requirements/used tools/kind/... evolves.

## How
1. Get historical "Who is hiring" posts on HackerNews
2. Analyes the keyword count history

## npm package

```bash
# install package
npm install -g hacker-job-trends

# see match count history on hackernews who is hiring post
hjt 'python'

# match multiple keyword and a count them together
hjt ' js ' + 'javascript'

# match multiple keywords but you want to do a subtraction opration
hjt 'remote' - 'no remote' - 'not remote'



```

## Contributes

### 1. Add new useful trend graph

By install the npm module and generate new interesting chart and open a PR for the `README.md`

### 2. Add new who is hiring link

1. Fork the repo and `npm install`
1. Add new "who is hiring" post url on [HN-who-is-hiring-monthly.md](./HN-who-is-hiring-monthly.md)
2. `npm run updateContents` and make a PR

## Examples

#### remote job trends:
```bash
$ hjt 'remote' - 'not remote' - 'no remote'

 123.00 ┤                                                                                         ╭
 115.53 ┤                                                                                         │
 108.07 ┤                                                                             ╭╮          │
 100.60 ┤                                                                             ││    ╭╮ ╭╮╭╯
  93.13 ┤                                                                            ╭╯╰╮   ││ │││
  85.67 ┤                                       ╭╮                                   │  ╰╮  ││ │╰╯
  78.20 ┤                                       ││                  ╭╮   ╭╮       ╭╮ │   │ ╭╯╰─╯
  70.73 ┤                                       ││  ╭╮ ╭╮ ╭╮   ╭╮  ╭╯╰─╮ │╰──╮ ╭╮╭╯│╭╯   │ │
  63.27 ┤                        ╭╮         ╭─╮ ││ ╭╯╰╮│╰─╯╰╮╭╮│╰──╯   │╭╯   ╰─╯╰╯ ││    ╰╮│
  55.80 ┤   ╭╮                 ╭╮││╭╮ ╭╮╭╮  │ ╰─╯╰─╯  ││    ││││       ╰╯          ╰╯     ││
  48.33 ┤   │╰╮      ╭──╮      │││││╰╮│╰╯│  │         ╰╯    ╰╯╰╯                          ╰╯
  40.87 ┤╭╮ │ ╰╮╭╮  ╭╯  ╰─╮╭╮╭─╯╰╯╰╯ ╰╯  ╰──╯
  33.40 ┤││ │  ╰╯╰╮╭╯     ││╰╯
  25.93 ┤││╭╯     ╰╯      ╰╯
  18.47 ┼╯││
  11.00 ┤ ╰╯
        :
        ┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──
      2011-01     2012-01     2013-01     2014-01     2015-01     2016-01     2017-01     2018-01     2019-01
```

#### blockchain trends

```
$ hjt 'blockchain'

  30.00 ┼                                                                                         ╭
  28.00 ┤                                                                                         │
  26.00 ┤                                                                                         │
  24.00 ┤                                                                                         │
  22.00 ┤                                                                                 ╭╮      │
  20.00 ┤                                                                                ╭╯╰╮    ╭╯
  18.00 ┤                                                                                │  ╰╮   │
  16.00 ┤                                                                                │   │   │
  14.00 ┤                                                                                │   │   │
  12.00 ┤                                                                                │   │   │
  10.00 ┤                                                                         ╭╮     │   ╰╮  │
   8.00 ┤                                                                         ││    ╭╯    ╰──╯
   6.00 ┤                                                                  ╭╮╭╮   ││    │
   4.00 ┤                                                                  ││││ ╭╮││╭╮  │
   2.00 ┤                                   ╭╮        ╭──╮ ╭─╮   ╭─╮ ╭──╮╭─╯╰╯╰╮│││╰╯│╭╮│
   0.00 ┼───────────────────────────────────╯╰────────╯  ╰─╯ ╰───╯ ╰─╯  ╰╯     ╰╯╰╯  ╰╯╰╯
        :
        ┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──
      2011-01     2012-01     2013-01     2014-01     2015-01     2016-01     2017-01     2018-01     2019-01
```

#### javascript trends:
```bash
$ hjt 'javascript' + ' js '

  97.00 ┼                                           ╭╮
  90.73 ┤                                           ││
  84.47 ┤                                   ╭╮      ││
  78.20 ┤                 ╭─╮       ╭╮      │╰╮     ││
  71.93 ┤              ╭╮ │ │╭╮ ╭──╮││ ╭╮ ╭╮│ │     │╰╮╭╮
  65.67 ┤     ╭╮      ╭╯│ │ │││╭╯  │││╭╯│ │││ │  ╭╮╭╯ ╰╯╰╮
  59.40 ┤     ││╭╮   ╭╯ │╭╯ ╰╯╰╯   ││╰╯ │ │╰╯ │  │╰╯     │       ╭╮ ╭╮
  53.13 ┤  ╭╮╭╯╰╯│ ╭╮│  ╰╯         ╰╯   │╭╯   ╰╮╭╯       │  ╭╮   │╰─╯╰╮   ╭╮╭╮
  46.87 ┤  │╰╯   │╭╯││                  ╰╯     ╰╯        ╰╮ ││   │    ╰─╮ │╰╯╰─╮    ╭╮      ╭╮  ╭╮╭
  40.60 ┤  │     ││ ╰╯                                    │ ││ ╭─╯      │ │    │ ╭╮ │╰╮╭─╮ ╭╯│ ╭╯╰╯
  34.33 ┤  │     ╰╯                                       ╰╮│╰─╯        │ │    │ │╰╮│ ││ ╰╮│ ╰─╯
  28.07 ┤╭╮│                                               ╰╯           ╰─╯    │ │ ││ ╰╯  ╰╯
  21.80 ┤│││                                                                   ╰╮│ ││
  15.53 ┼╯││                                                                    ╰╯ ╰╯
   9.27 ┤ ││
   3.00 ┤ ╰╯
        :
        ┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──
      2011-01     2012-01     2013-01     2014-01     2015-01     2016-01     2017-01     2018-01     2019-01
```

### nodejs trends

```bash
$ hjt 'nodejs' + 'node.js'

  30.00 ┼                                          ╭╮            ╭╮
  28.00 ┤                                          │╰╮           ││
  26.00 ┤                                          │ │   ╭╮      ││
  24.00 ┤                                          │ │╭╮╭╯│      ││                               ╭
  22.00 ┤                      ╭╮      ╭╮    ╭╮ ╭──╯ ││╰╯ ╰╮     ││                             ╭╮│
  20.00 ┤                      ││      ││    │╰╮│    ╰╯    │     ││╭╮                       ╭╮  │││
  18.00 ┤         ╭─╮╭─╮       ││      ││ ╭╮ │ ││          │    ╭╯│││         ╭╮            ││  │││
  16.00 ┤      ╭╮ │ ││ ╰─╮ ╭╮ ╭╯│╭╮    ││╭╯╰╮│ ╰╯          │   ╭╯ │││     ╭╮ ╭╯│ ╭╮    ╭╮   ││  │╰╯
  14.00 ┤      │╰╮│ ╰╯   │ ││╭╯ ││╰─╮  │││  ││             │╭──╯  ╰╯│ ╭╮ ╭╯│╭╯ │ │╰╮ ╭╮│╰╮  ││  │
  12.00 ┤     ╭╯ ╰╯      ╰─╯╰╯  ││  ╰╮╭╯││  ││             ││       │╭╯╰╮│ ╰╯  │ │ │ │╰╯ │  ││  │
  10.00 ┤  ╭╮╭╯                 ╰╯   ╰╯ ╰╯  ╰╯             ╰╯       ╰╯  ││     ╰╮│ │╭╯   ╰╮ │╰╮ │
   8.00 ┤  │╰╯                                                          ╰╯      ╰╯ ││     ╰─╯ │╭╯
   6.00 ┤╭╮│                                                                       ╰╯         ╰╯
   4.00 ┤│││
   2.00 ┤│╰╯
   0.00 ┼╯
        :
        ┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──────────┼┼──
      2011-01     2012-01     2013-01     2014-01     2015-01     2016-01     2017-01     2018-01     2019-01
```

## Best search patten for searching monthly "who is hiring" on hackernews
```bash
# Google:
Ask HN: Who is Hiring? "November 2011" site:https://news.ycombinator.com/
```