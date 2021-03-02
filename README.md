# face-memory

Repository for my face memorization game. Check it out [https://jamescalixto.com/face-memory/](here).

## Credits

Face dataset is the [Flickr-Faces-HQ](https://github.com/NVlabs/ffhq-dataset) dataset. The first 5,000 images were used, with the only modifications being resizing and compression. Please look at the repository there for the appropriate credit and licensing.

Gender dataset for this is sourced from [this repo](https://github.com/DCGM/ffhq-features-dataset). Gender information is binary and also scored by algorithm so the usual caveats apply.

A big thank you to both sources above for making this possible. It is actually difficult to find an openly available face dataset, especially one that also has gender tagging information.

Name datasets are from the [Social Security Administration] and uses all names in 2019 data with 100 or more uses.

## Notes

### react.js

A word of warning: this code is not pretty; it is ugly and state changes reach into the DOM and across js files and all over the place to get it to work. I had originally intended to do this using React.js but I did not. I am hoping that the troublesome experience I had coupling game logic to rendering, handling countdown timers, etc. dissuades me from ever doing something like this again without React, and thus I will learn it.

### Gender

Why gender the faces? That is a good question. I would not (and could not) have done this without the gender-tagged metadata for the faces or the SSA lists of names by gender. I suppose I would attribute this mostly to the data being available, though it would be an interesting experiment to see if people's face/name memory declined if names were assigned without regard to tagged gender.

Again, genders for the faces are 1) binary, although there were UNKNOWN options, and 2) tagged by an algorithm, so there will definitely be inaccuracies.

### Scoring

At first I had a boring "1 point if right, none if wrong" scoring function but I decided to make it more engaging by adding a consolation half-point if the wrong answer is close and a penalty point if the wrong answer is not close. This slight tweak gamified it and made it surprisingly more fun to play.
