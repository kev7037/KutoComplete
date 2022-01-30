# KutoComplete.Js
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![MIT](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)

Simple Open source Auto-Complete library using vanilla JavaScript with NO dependency

Check the live demo!

> https://kev7037.github.io/KutoComplete/

<img src="https://github.com/kev7037/KutoComplete.Js/blob/main/KutoComplete_demo.gif" width="800" height="300" />

# How to use
> No dependencies, just pure javascript :)

Add `KutoComplete.Js` file to your project and add `script` reference in the HTML page and you are good to go

# Usage

There are many auto-complete libraries out there but this one is different!
`KutoComplete.Js` will be assigned to an `HTML Input Dom (type: text)` and uses desired number of string arrays as `data source` as well as a `separator char` per data source.

You should create an instance of `atc_kev_model`
> new atc_kev_model("#", data_arr1, '(', ')')

And push it into an array. The result can be like below:

    var atc_model_list = [
            new atc_kev_model("#", data_arr1, '(', ')', null),
            new atc_kev_model("[", data_arr2, null, ']', '[')
        ];

`atc_kev_model`'s constructor requires: `(separator_char, data_source, start_char, end_char, (optional) start_char_for_validaton)`

Then you should create an instance of `atc_kev` and pass `HTML Input Dom Id` and the Array of `atc_kev_model` in this case `atc_model_list` and finally call the `atc_init()` function

    var atc_instance = new atc_kev(html_input_id, atc_model_list);
    atc_instance.atc_init();
    
You can also use `atc_validate_additional_chars()` function to validate the text written in Input Dom.

This function will return `false` if it finds (if avaliable) a `start_char_for_validaton` that does not end with `end_char`.

You can also pass any css classes for DropDrown that will be created for chosen Input:

    atc_instance.atc_init('col-12 text-black');
    
Index.html file added as an example of the KutoComplete usage.
