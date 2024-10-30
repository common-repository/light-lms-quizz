function light_lms_evaluate_question(formClassName){

    var answerString = document.querySelector( '.' + formClassName + ' ' + 'input[name=answer]').value,
        answer = light_lms_digitsToLetters( answerString.replace("10", "J").replace(" ", "").toUpperCase().split('') ),
        checked = document.querySelectorAll( '.' + formClassName + ' ' + 'input[type=checkbox]:checked'),
        answerGiven = [],
        wrong = document.querySelector( '.' + formClassName + ' ' + ' div.feedback2'),
        right = document.querySelector( '.' + formClassName + ' ' + ' div.feedback1');

    checked.forEach( ( inp ) => {
        answerGiven.push( inp.name )
    })

    if( answerGiven.length != 0 ){
        if( light_lms_evaluate( answer, answerGiven ) ){
            right.classList.remove( 'hide' )
            wrong.classList.add( 'hide' )
        }
        else{
            wrong.classList.remove( 'hide' )
            right.classList.add( 'hide' )
        }
    }
}

function light_lms_cbLabelClicked( uniqId, char ){
    var cb = document.querySelector( 'form.' + uniqId + ' input[name=' + char + ']' );
     
    cb.dispatchEvent( new MouseEvent( 'click' ))
}

function light_lms_digitsToLetters( ar ){
    var ret = [],
        letters = 'ABCDEFGHIJ'

    if( ar instanceof Array ){
        ar.forEach( ( a, n ) => {
            var numb = parseInt( a ) - 1
            if( ! isNaN( numb ) ){
                ret.push( letters.substring( numb, numb+1) )
            }
            else
                ret.push( a )
        })
    }
    return ret
}

function light_lms_evaluate( answer, answerGiven ){
    var ret = true

    if( answerGiven.length != answer.length) 
        ret = false

    if( answerGiven.length != 0){
        answer.forEach( (a) => {
            if( answerGiven.indexOf(a) == -1)
                ret = false
        })
    }

    return ret
}

function light_lms_onchange_checked( evnt ){
    var formID = evnt.target.getAttribute( 'formID' ),
        value = evnt.target.checked,
        cbs = document.querySelectorAll( '.' + formID + ' input[type=checkbox]' );

    cbs.forEach( ( cb ) => {
        cb.checked = false
    })

    evnt.target.checked = value
}

function light_lms_hide_feedback( evnt ){
    var formID = evnt.target.getAttribute( 'formID' )

    document.querySelector( '.' + formID + ' .feedback1' ).classList.add( 'hide' )
    document.querySelector( '.' + formID + ' .feedback2' ).classList.add( 'hide' )
}

function light_lms_apply_color_settings( formID ){
    var fb1 = document.querySelector( '.feedback1' ),
        fb2 = document.querySelector( '.feedback2' ),
        fb1BgClr = document.querySelector( 'form.' + formID + ' input[name=feedback1BgColor]').value,
        fb1TxtClr = document.querySelector( 'form.' + formID + ' input[name=feedback1TxtColor]').value,
        fb2BgClr = document.querySelector( 'form.' + formID + ' input[name=feedback2BgColor]' ).value,
        fb2TxtClr = document.querySelector( 'form.' + formID + ' input[name=feedback2TxtColor]').value;

        // Avoid using style attribute by not setting a value for the colors
        if( fb1BgClr != '' || fb1TxtClr != '')
            fb1.setAttribute( 'style', 
                'color:' + fb1TxtClr + ';' +
                'background-color:' + fb1BgClr + ';' 
            )

        if( fb2BgClr != '' || fb2TxtClr != '')
            fb2.setAttribute( 'style', 
                'color:' + fb2TxtClr + ';' +
                'background-color:' + fb2BgClr + ';' 
            )
}

function light_lms_set_prereguisites_text( formID ){

    var el = document.querySelector( 'form.' + formID + ' .prerequisites' ),
        hint = document.querySelector( 'form.' + formID + ' input[name=hint]' ).value,
        p = document.createElement( 'p' ),
        multiple = document.querySelector( 'form.' + formID + ' input[name=multiple]').value,
        mult = parseInt( multiple ),
        __ = wp.i18n.__;

    if( mult == 1 )
        p.innerHTML = __( 'Multiple answers can be given :', 'light-lms-quizz' )

    if( hint != ''){
        p.innerHTML = hint
        el.classList.remove( 'hide' )
    }

    el.appendChild( p )
}

jQuery(document).ready( function(){

    var forms = document.querySelectorAll( "form" )

    if( forms ){
        
        forms.forEach( (f) => {

            var uniqClass = null,
                formClss = f.className.split(' '),
                multiple = false;

            formClss.forEach( (cls) => {
                if( cls.match(/lightLMS\d+/))
                    uniqClass = cls
            })

            if( uniqClass ){

                light_lms_apply_color_settings( uniqClass )

                light_lms_set_prereguisites_text( uniqClass )

                multiple = document.querySelector('.' + uniqClass + ' input[name=multiple]')
            
                var cks = document.querySelectorAll( '.' + uniqClass + ' input[type=checkbox]')
                cks.forEach( (ck ) => {
                    if(multiple && multiple.value == '0')
                        ck.addEventListener( 'change', light_lms_onchange_checked )
                    ck.addEventListener( 'change', light_lms_hide_feedback )
                })
            }

            
        })
    }

})