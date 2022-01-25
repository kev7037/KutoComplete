class atc_kev_model {
    atc_seperator;
    atc_data;
    atc_additional_start_char;
    atc_additional_end_char;
    constructor(seperator, data, additional_start_char, additional_end_char) {
        this.atc_data = data;
        this.atc_seperator = seperator;
        this.atc_additional_start_char = additional_start_char;
        this.atc_additional_end_char = additional_end_char;
    }
}

class atc_kev {

    atc_src_arr;

    atc_input_id;
    atc_select_id;

    atc_selectedDict;
    atc_textIndex;


    atc_select_element;
    atc_input_element;
    constructor(atc_input_id, atc_src_arr) {
        this.atc_src_arr = atc_src_arr;
        this.atc_input_id = atc_input_id;
        this.atc_select_id = "atc_select";
        this.atc_selectedDict = 0;
        this.atc_textIndex = 0;
        this.atc_input_element = document.getElementById(atc_input_id);
    }


    atc_init(atc_select_classList) {

        document.getElementById(this.atc_input_id).onkeyup = (e) => {

            this.atc_select_element = document.getElementById(this.atc_select_id);

            this.atc_textIndex = e.target.selectionStart;

            let inputElText =  document.getElementById(this.atc_input_id).value;
            let inputText_bf_split = inputElText.substring(0, this.atc_textIndex).split(' ');
            let inputText = inputText_bf_split[inputText_bf_split.length - 1];


            if (!!this.atc_select_element) {
                if (inputText.trim().length == 0) {
                    this.atc_select_element.remove();
                    this.atc_select_element = null;
                } else {
                    [...this.atc_select_element.options].forEach(el => {
                        el.remove();
                    });
                }
            }

            if (inputElText.trim().length == 0)
                return;

            let itr_dict;

            this.atc_src_arr.forEach((el, idx) => {
                if (inputText.trim().startsWith(el.atc_seperator)) {
                    itr_dict = el.atc_data;
                    this.atc_selectedDict = idx;
                    return;
                }
            });

            if (!(!!itr_dict)) return;


            this.atc_createSelectDom(atc_select_classList);
            let lastBracket = inputText.substring(1);
            itr_dict.forEach(element => {
                if (element.toLowerCase().includes(lastBracket)) {

                    let li = document.createElement("option");
                    li.id = element;
                    li.text = element;

                    this.atc_select_element.appendChild(li);

                    if (!(e.key == "ArrowUp"|| e.key == "ArrowLeft" || e.key == "ArrowRight")) {
                        this.atc_select_element.focus();
                    }
                }
            });

            let selSize = this.atc_select_element.options.length;
            this.atc_select_element.size = selSize;

            if (selSize == 0) {
                this.atc_select_element.remove();
                this.atc_select_element = null;
            }
            if (e.key == "ArrowDown") // down
                this.atc_select_element.selectedIndex = 0;
            
        }


    }

    atc_createSelectDom(atc_select_classList) {

        if (!(!!this.atc_select_element)) {
            let sel = document.createElement("select");
            sel.id = this.atc_select_id;
            sel.style.width = this.atc_input_element.offsetWidth + "px";
            sel.style.overflowY = "auto";

            if (!!atc_select_classList) {
                Object.assign(sel, {className: atc_select_classList});
            }

            this.atc_input_element.parentNode.insertBefore(sel, this.atc_input_element.nextSibling);

            sel.onkeydown = (e) => {

                switch (e.key) {

                    case "Enter":
                        this.atc_on_option_selected();
                        break;

                    case "Escape":
                        this.atc_select_element.remove();
                        this.atc_select_element = null;
                        break;

                    case "ArrowDown": // no op
                        break;

                    case "ArrowUp":
                    case "ArrowLeft":
                    case "ArrowRight":
                        this.atc_input_element.focus();
                        break;

                    default:
                        
                        this.atc_input_element.focus();
                        break;
                }

            }

            sel.onclick = (e) => {
                this.atc_on_option_selected();
            }

            this.atc_select_element = sel;            
        };
    }

    atc_on_option_selected(){

        let textAfterIndx = this.atc_removeCharAfterIndex(this.atc_input_element.value, this.atc_textIndex);

        let selected_atc_arr = this.atc_src_arr[this.atc_selectedDict];
        this.atc_input_element.value = 
            this.atc_removeCharFromIndex(this.atc_input_element.value, this.atc_textIndex,
                                        selected_atc_arr.atc_data.find(x => x == this.atc_select_element.options[this.atc_select_element.selectedIndex].text)
                                        + (selected_atc_arr.atc_additional_start_char ?? (selected_atc_arr.atc_additional_end_char ?? ''))
                                        + ' ') + textAfterIndx;

        this.atc_select_element.remove();
        this.atc_select_element = null;
        this.atc_input_element.focus();
    }

    //js function to remove character from end of string until it reaches a space
    atc_removeCharAfterIndex(str, index) {
        for (let i = index; i <= str.length; i++) {
            if (!(!!str[i])) 
                return '';
            else if (str[i] == ' ' || str[i] == this.firstSeperator || str[i] == this.secondSeperator)
                return (!!str.substring(i) ? str.substring(i) : '');
        }
    }

    //js function to remove character from given index of string until it reaches a space
    atc_removeCharFromIndex(str, index, str2 = "") {
        let lastChar = str.substring(index);
        if (lastChar == ' ' || this.atc_src_arr.find(x => x.atc_seperator == lastChar))
            return str + str2;
        else
            return this.atc_removeCharFromIndex(str.substring(0, index), index - 1, str2);
    }

    // function to validate additional characters
    atc_validate_additional_chars() {
        let str = document.getElementById(this.atc_input_id).value;
        
        let isvalid = true;
        this.atc_src_arr.forEach((el) => {

                if (isvalid && !!el.atc_additional_start_char) {
                    let start_char = el.atc_additional_start_char;
                    let end_char = el.atc_additional_end_char;

                    let start_char_count = 0;
                    let end_char_count = 0;

                    for (let i = 0; i < str.length; i++) {
                        if (str[i] == start_char) {
                            start_char_count++;
                        }
                        if (str[i] == end_char) {
                            end_char_count++;
                        }
                    }

                    if (start_char_count != end_char_count) {
                        alert("Please close all " + el.atc_additional_start_char);
                        isvalid = false;
                    }
                }
            }
        );

        return isvalid;
    }

}