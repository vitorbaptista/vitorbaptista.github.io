---
layout: post
title: "How to transcribe a video using YouTube"
description: ""
---

Transcribing a video is a tedious and time-consuming task. It used to be
impossible for machines to do, but this isn't the case anymore, just ask Siri,
Alexa, Google Home, or any other of the many voice assitants. The problem
becomes how a regular user this technology to convert their own videos?

YouTube automatically generates subtitles for videos. What if we could use it to
transcribe our own videos? Turns out we can, and it's pretty easy (if you know
how to use the command-line).

## Pre-requisites

* Basic knowledge of the command-line
* [youtube-dl][youtube-dl]
* Your video uploaded to YouTube (you can set it as *Unlisted* if you don't want others to find it)

## Instructions

We will use The Guardian's [An extraordinary year: 2017 in review][guardian2017]
video as an example, but this should work with any video. You can check the
quality of YouTube's automatic subtitle generation by enabling the video's
subtitles. To do so, click on the gear symbol, *Subtitles/CC*, and selection
*English (auto-generated)*. If you don't see this option, maybe YouTube hasn't
generated the subtitles yet, so wait a bit and try again.

### Step 1. Download the auto-generated subtitles

Our first step is to download these subtitles. We will use
[youtube-dl][youtube-dl] for it. Open your terminal, and write:

```
youtube-dl --skip-download --write-auto-sub --sub-lang en https://www.youtube.com/watch?v=B0l6lMoeFvg
```

The options we're using are:

* `--skip-download`: Don't download the actual video, just the subtitles
* `--write-auto-sub`: Write the automatically generated subtitles
* `--sub-lang en`: Select the English subtitles

To see all possible languages, run `youtube-dl --list-subs
https://www.youtube.com/watch?v=027ikJwr6fQ`.

![Downloading YouTube subtitles using youtube-dl][youtube-dl:gif]

This command will download the subtitle in the current directory. It is a file
that ends in `.vtt`, in my case it's named `An extraordinary year - 2017 in
review-027ikJwr6fQ.en.vtt`. If you open it, you should see something like:

```
WEBVTT
Kind: captions
Language: en
Style:
::cue(c.colorCCCCCC) { color: rgb(204,204,204);
 }
::cue(c.colorE5E5E5) { color: rgb(229,229,229);
 }
##

00:00:00.730 --> 00:00:04.950 align:start position:19%
[Music]

00:00:02.240 --> 00:00:08.690 align:start position:19%
after<c.colorE5E5E5><00:00:03.240><c> Trump's</c><00:00:03.570><c> election</c></c><c.colorCCCCCC><00:00:04.049><c> America</c><00:00:04.799><c> is</c></c>

00:00:04.950 --> 00:00:08.690 align:start position:19%
bracing<00:00:05.549><c> itself</c><00:00:05.700><c> for</c><00:00:06.029><c> conflict</c>

00:00:11.220 --> 00:00:15.840 align:start position:19%
```

### Step 2. Convert the subtitle to a text file

The subtitle file we download contain everything we need, but it's very hard to
read, as it also contains timing information. There are many online tools that
convert VTT files to TXT, leaving us with only the text. Just search for
"convert vtt to txt" and you should find an option. The one I found was
[Subtitle Tools][subtitle-tools], but any should do the same.

Once you find the tool, upload the VTT file we downloaded in the last step, and
download the resulting TXT file. This is the result:

```
﻿[Music]

after Trump's election America is

bracing itself for conflict

I knew for a few families again I know

some that gray and there are no salmon

identify the distance between war and

civilian life a brand new investigation

into the tax lives of the rich and

famous

Africans have benefited from their

```

Which is impressively good, getting almost everything correctly.

## Conclusion

Although the transcription quality probably isn't as good as what a human
transcriber would do, it can serve as a starting point. Instead of starting from
scratch, you can review and fix what YouTube generated, hopefully saving you (a
lot of) time. As YouTube improves, this method will generate better results.

If your results weren't good, you might try improving your audio's quality and uploading again. There is a limit on what it can/can't do, but if your audio is clear and its language is well supported, you should be able to get decent results.

[youtube-dl]: https://rg3.github.io/youtube-dl/
[guardian2017]: https://www.youtube.com/watch?v=027ikJwr6fQ
[vtt-converter]: https://subtitletools.com/convert-subtitles-to-plain-text-online
[youtube-dl:gif]: /assets/images/youtube-dl-subtitles.gif
[subtitle-tools]: https://subtitletools.com/convert-subtitles-to-plain-text-online "Subtitle Tools"
