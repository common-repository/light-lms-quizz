(function(){

    const { registerBlockType } = wp.blocks;
    const { __ } = wp.i18n;
    const { PanelColorSettings } = wp.blockEditor;

    var el = wp.element.createElement,
        Fragment = wp.element.Fragment,
        RichText = wp.blockEditor.RichText,
        PanelBody = wp.components.PanelBody,
        PanelRow = wp.components.PanelRow,
        InspectorControls = wp.blockEditor.InspectorControls,
        CheckboxControl = wp.components.CheckboxControl,
        SelectControl = wp.components.SelectControl,
        TextControl = wp.components.TextControl,
        TextareaControl = wp.components.TextareaControl;

    var svgPath3 = "m 4.4111017,293.7976 q 0.1348765,0.12083 0.2219842,0.30347 0.087108,0.18265 0.087108,0.47207 0,0.28661 -0.1039673,0.52546 -0.1039673,0.23884 -0.2922324,0.41586 -0.2107445,0.1967 -0.497357,0.29224 -0.2838026,0.0927 -0.6238037,0.0927 -0.3484309,0 -0.6856221,-0.0843 -0.3371912,-0.0815 -0.5535556,-0.17984 v -0.58727 h 0.042149 q 0.2388438,0.15735 0.5619854,0.26132 0.3231415,0.10397 0.6238037,0.10397 0.1770253,0 0.3765301,-0.059 0.1995048,-0.059 0.3231416,-0.17422 0.1292566,-0.12363 0.191075,-0.27256 0.064628,-0.14893 0.064628,-0.37653 0,-0.22479 -0.073058,-0.37091 -0.070248,-0.14893 -0.1966948,-0.23322 -0.1264467,-0.0871 -0.306282,-0.11802 -0.1798353,-0.0337 -0.3877699,-0.0337 H 2.9302704 v -0.46645 h 0.1966949 q 0.4271088,0 0.6800022,-0.17702 0.2557033,-0.17984 0.2557033,-0.52265 0,-0.15174 -0.064628,-0.26413 -0.064628,-0.11521 -0.1798353,-0.18827 -0.1208268,-0.0731 -0.2585132,-0.10116 -0.1376864,-0.0281 -0.3119019,-0.0281 -0.266943,0 -0.5676052,0.0955 -0.3006621,0.0955 -0.5676052,0.26976 h -0.028099 v -0.58728 q 0.1995048,-0.0983 0.5310761,-0.17983 0.3343813,-0.0843 0.6462831,-0.0843 0.306282,0 0.5395059,0.0562 0.233224,0.0562 0.421489,0.17983 0.2023148,0.13488 0.306282,0.32595 0.1039673,0.19108 0.1039673,0.44678 0,0.34843 -0.2472735,0.60976 -0.2444636,0.25851 -0.5788449,0.32595 v 0.0393 q 0.1348765,0.0225 0.3090919,0.0955 0.1742155,0.0702 0.2950423,0.17703 z",
        svgPath5 = "m 4.6789843,294.47185 q 0,0.30492 -0.1114126,0.58345 -0.1114127,0.27853 -0.3049188,0.4691 -0.2110976,0.20524 -0.5042888,0.31665 -0.2902592,0.10848 -0.6743396,0.10848 -0.3576932,0 -0.6889992,-0.0762 -0.331306,-0.0733 -0.5599951,-0.17884 v -0.61864 h 0.041047 q 0.2404168,0.15246 0.562927,0.26094 0.3225103,0.10555 0.6332929,0.10555 0.2081657,0 0.4016719,-0.0586 0.1964381,-0.0586 0.3488975,-0.20523 0.1290041,-0.12607 0.1935061,-0.30199 0.067434,-0.17591 0.067434,-0.40753 0,-0.22576 -0.079162,-0.38115 -0.07623,-0.15539 -0.2140296,-0.24921 -0.1524594,-0.11142 -0.3723527,-0.1554 -0.2169615,-0.0469 -0.4866973,-0.0469 -0.2580082,0 -0.498425,0.0352 -0.2374848,0.0352 -0.4104676,0.0704 v -2.24877 h 2.6269927 v 0.51308 H 2.5885314 v 1.16104 q 0.1260722,-0.0117 0.2580082,-0.0176 0.131936,-0.006 0.2286891,-0.006 0.3547613,0 0.6215653,0.0616 0.2668039,0.0586 0.4896292,0.2111 0.2345529,0.16126 0.363557,0.41633 0.1290041,0.25508 0.1290041,0.63916 z",
        svgPath1 = "M 10.755953,310.18573 H 2.3601193 V 308.6024 H 5.589286 V 298.20656 H 2.3601193 v -1.41666 q 0.65625,0 1.40625,-0.10417 0.75,-0.11458 1.1354167,-0.32292 0.4791667,-0.26041 0.75,-0.65625 0.28125,-0.40625 0.3229167,-1.08333 h 1.6145834 v 13.97917 h 3.1666669 z",
        svgPath0 = "m 22.525298,302.24672 q 0,4.17709 -1.3125,6.13542 -1.302084,1.94792 -4.052084,1.94792 -2.791666,0 -4.083333,-1.97917 -1.28125,-1.97917 -1.28125,-6.08333 0,-4.13542 1.302083,-6.10417 1.302084,-1.97917 4.0625,-1.97917 2.791667,0 4.072917,2.01042 1.291667,2 1.291667,6.05208 z m -2.739584,4.72917 q 0.364584,-0.84375 0.489584,-1.97917 0.135416,-1.14583 0.135416,-2.75 0,-1.58333 -0.135416,-2.75 -0.125,-1.16666 -0.5,-1.97916 -0.364584,-0.80209 -1,-1.20834 -0.625,-0.40625 -1.614584,-0.40625 -0.979166,0 -1.625,0.40625 -0.635416,0.40625 -1.010416,1.22917 -0.354167,0.77083 -0.489584,2.01042 -0.125,1.23958 -0.125,2.71875 0,1.625 0.114584,2.71875 0.114583,1.09375 0.489583,1.95833 0.34375,0.8125 0.96875,1.23958 0.635417,0.42709 1.677083,0.42709 0.979167,0 1.625,-0.40625 0.645834,-0.40625 1,-1.22917 z"

    var svgIcon3 = el( 'svg', {
            width:24,
            height:24,
            viewBox: '0 0 6.6145833 6.6145833'
        },
            el( 'g', {
                transform: "translate(0,-290.38542)"
            },
                el( 'path', {
                    d: svgPath3
                } )
            ),
        ),
        svgIcon5 = el( 'svg', {
            width:24,
            height:24,
            viewBox: '0 0 6.6145833 6.6145833'
        },
            el( 'g', {
                transform: "translate(0,-290.38542)"
            },
                el( 'path', {
                    d: svgPath5
                } )
            ),
        ),
        svgIcon10 = el( 'svg', {
            width:24,
            height:24,
            viewBox: '0 0 24 24'

        },
            el( 'g', {
                transform: "translate(0,-290.38542)"
            },
                el( 'path', {
                    d: svgPath1
                } ),
                el( 'path', {
                    d: svgPath0
                } )
            ),
        );

    function registerTitle( n ){
        if( n == 3 )
            return  __("Multiple choice (3)", 'light-lms-quizz');
        if( n == 5 )
            return  __("Multiple choice (5)", 'light-lms-quizz');
        if( n == 10 )
            return  __("Multiple choice (10)", 'light-lms-quizz');
    }

    function registerAttributes( n ){
        var a3 = {
            content: {
                type: 'string',
                source: 'html',
                selector: 'p',
            },
            uniqueID:{
                type: 'string'
            },
            possibleAnswer1:{
                type: 'string',
            },
            possibleAnswer2:{
                type: 'string',
            },
            possibleAnswer3:{
                type: 'string',
            },
            answer: {
                type: 'string'
            },
            feedback1:{
                type: 'string',
                default: __( 'Right', 'light-lms-quizz')
            },
            feedback2: {
                type: 'string',
                default: __( 'Wrong', 'light-lms-quizz')
            },
            multiple:{
                type: 'string',
                default: '0'
            },
            buttonText:{
                type: 'string',
                default: __('Right or wrong?', 'light-lms-quizz')
            },
            formClass:{
                type:'string',
                default: ''
            },
            feedback1Class:{
                type:'string',
                default: ''
            },
            feedback2Class:{
                type:'string',
                default: ''
            },
            feedback1BgColor:{
                type: 'string'
            },
            feedback1TxtColor:{
                type: 'string'
            },
            feedback2BgColor:{
                type: 'string'
            },
            feedback2TxtColor:{
                type: 'string'
            },
            hint:{
                type: 'string'
            },
            weight:{
                type: 'string',
                default: ''
            },
            freeField1:{
                type: 'string',
                default: ''
            },
            freeField2:{
                type: 'string',
                default: ''
            }
        }

        if( n == 3)
            return a3
        
        Object.assign( a3, {
            possibleAnswer4:{
                type: 'string',
            },
            possibleAnswer5:{
                type: 'string',
            }
        })

        
        if( n == 5 )
            return a3

        Object.assign( a3, {
            possibleAnswer6:{
                type: 'string',
            },
            possibleAnswer7:{
                type: 'string',
            },
            possibleAnswer8:{
                type: 'string',
            },
            possibleAnswer9:{
                type: 'string',
            },
            possibleAnswer10:{
                type: 'string',
            }
        })

        if( n == 10 )
            return a3
    }

    function registerBeforeEdit( props ){
        
        if( ! props.attributes.uniqueID )
            props.attributes.uniqueID = 'lightLMS' + (new Date()).getTime();

        return props
    }

    function registerEditQuestion( props ){
        return el( RichText, {
                tagName: 'p',  // The tag here is the element output and editable in the admin
                className: 'question',
                value: props.attributes.content, // Any existing content, either from the database or an attribute default
                allowedFormats : [ 'core/bold', 'core/italic' ], // Allow the content to be made bold or italic, but do not allow other formatting options
                onChange: function( content ) {
                    props.setAttributes( { content: content } ); 
                },
                placeholder: __( 'Question ...', 'light-lms-quizz'), // Display this text before any content has been added by the user
            } )
    }

    function registerEditAnswers( props, n ){
        var a3 = [ 
            el( 'tr', null, 
                el( 'td', null, 
                    el('input', { type:'checkbox', disabled: true}),
                ), 
                el( 'td', null, 
                    el( RichText, {
                        allowedFormats: [ 'core/bold', 'core/italic' ],
                        tagName: 'span',
                        placeholder: __( 'Answer 1', 'light-lms-quizz'),
                        value: props.attributes.possibleAnswer1,
                        onChange: function( content ) {
                            props.setAttributes( { possibleAnswer1: content } ); 
                        },
                    }),
                ) 
            ),
            el( 'tr', null, 
                el('td', null, 
                    el('input', { type:'checkbox', disabled:true}),
                ),
                el('td', null, 
                    el( RichText, {
                        allowedFormats: [ 'core/bold', 'core/italic' ],
                        tagName: 'span',
                        placeholder: __( 'Answer 2', 'light-lms-quizz'),
                        value: props.attributes.possibleAnswer2,
                        onChange: function( content ) {
                            props.setAttributes( { possibleAnswer2: content } ); 
                        },
                    }),
                )
            ),
            el('tr', null, 
                el('td', null, 
                    el('input', { type:'checkbox', disabled:true}),
                ),
                el('td', null, 
                    el( RichText, {
                        allowedFormats: [ 'core/bold', 'core/italic' ],
                        tagName: 'span',
                        placeholder: __( 'Answer 3', 'light-lms-quizz'),
                        value: props.attributes.possibleAnswer3,
                        onChange: function( content ) {
                            props.setAttributes( { possibleAnswer3: content } ); 
                        },
                    }),
                )
            ) 
        ]

        if( n == 3 )
            return  el( 'table', null, a3)

        a3 = a3.concat([
            el('tr', null, 
                el('td', null, 
                    el('input', { type:'checkbox', disabled:true}),
                ),
                el('td', null, 
                    el( RichText, {
                        allowedFormats: [ 'core/bold', 'core/italic' ],
                        tagName: 'span',
                        placeholder: __( 'Answer 4', 'light-lms-quizz'),
                        value: props.attributes.possibleAnswer4,
                        onChange: function( content ) {
                            props.setAttributes( { possibleAnswer4: content } ); 
                        },
                    }),
                )
            ),
            el('tr', null, 
                el('td', null, 
                    el('input', { type:'checkbox', disabled:true}),
                ),
                el('td', null, 
                    el( RichText, {
                        allowedFormats: [ 'core/bold', 'core/italic' ],
                        tagName: 'span',
                        placeholder: __( 'Answer 5', 'light-lms-quizz'),
                        value: props.attributes.possibleAnswer5,
                        onChange: function( content ) {
                            props.setAttributes( { possibleAnswer5: content } ); 
                        },
                    }),
                )
            )]
        )

        if( n == 5 )
            return  el( 'table', null, a3)

        a3 = a3.concat([
            el('tr', null, 
                el('td', null, 
                    el('input', { type:'checkbox', disabled:true}),
                ),
                el('td', null, 
                    el( RichText, {
                        allowedFormats: [ 'core/bold', 'core/italic' ],
                        tagName: 'span',
                        placeholder: __( 'Answer 6', 'light-lms-quizz'),
                        value: props.attributes.possibleAnswer6,
                        onChange: function( content ) {
                            props.setAttributes( { possibleAnswer6: content } ); 
                        },
                    }),
                )
            ),
            el('tr', null, 
                el('td', null, 
                    el('input', { type:'checkbox', disabled:true}),
                ),
                el('td', null, 
                    el( RichText, {
                        allowedFormats: [ 'core/bold', 'core/italic' ],
                        tagName: 'span',
                        placeholder: __( 'Answer 7', 'light-lms-quizz'),
                        value: props.attributes.possibleAnswer7,
                        onChange: function( content ) {
                            props.setAttributes( { possibleAnswer7: content } ); 
                        },
                    }),
                )
            ),
            el('tr', null, 
                el('td', null, 
                    el('input', { type:'checkbox', disabled:true}),
                ),
                el('td', null, 
                    el( RichText, {
                        allowedFormats: [ 'core/bold', 'core/italic' ],
                        tagName: 'span',
                        placeholder: __( 'Answer 8', 'light-lms-quizz'),
                        value: props.attributes.possibleAnswer8,
                        onChange: function( content ) {
                            props.setAttributes( { possibleAnswer8: content } ); 
                        },
                    }),
                )
            ),
            el('tr', null, 
                el('td', null, 
                    el('input', { type:'checkbox', disabled:true}),
                ),
                el('td', null, 
                    el( RichText, {
                        allowedFormats: [ 'core/bold', 'core/italic' ],
                        tagName: 'span',
                        placeholder: __( 'Answer 9', 'light-lms-quizz'),
                        value: props.attributes.possibleAnswer9,
                        onChange: function( content ) {
                            props.setAttributes( { possibleAnswer9: content } ); 
                        },
                    }),
                )
            ),
            el('tr', null, 
                el('td', null, 
                    el('input', { type:'checkbox', disabled:true}),
                ),
                el('td', null, 
                    el( RichText, {
                        allowedFormats: [ 'core/bold', 'core/italic' ],
                        tagName: 'span',
                        placeholder: __( 'Answer 10', 'light-lms-quizz'),
                        value: props.attributes.possibleAnswer10,
                        onChange: function( content ) {
                            props.setAttributes( { possibleAnswer10: content } ); 
                        },
                    }),
                )
            )] 
        )

        if( n == 10 )
            return  el( 'table', null, a3)
    }
    
    function registerEditSelectMultipleAnswersOptions( n ){
        return [{
            value: '1',
            label: __('Yes', 'light-lms-quizz')
        }, {
            value: '0',
            label: __('No', 'light-lms-quizz')
        }]
    }

    function registerEditControls( props, n ){
        return  el( Fragment, {}, 
                    el( InspectorControls, {}, 
                    [ 
                        el( PanelBody, { title: __('Answer settings', 'light-lms-quizz')},
                            el( PanelRow, {},
                                el( TextControl, {
                                    label: __( 'Answer', 'light-lms-quizz'),
                                    help: __( 'The right answer (1 or more letters)', 'light-lms-quizz'),
                                    value: props.attributes.answer,
                                    onChange: ( value ) => {
                                        props.setAttributes( { answer: value} )
                                    }
                                }),
                            ),
                            el( PanelRow, {},
                                el( SelectControl, {
                                    label: __( 'Multiple answers', 'light-lms-quizz'),
                                    help: __( 'Can multiple answers be chosen?', 'light-lms-quizz'),
                                    value: props.attributes.multiple,
                                    options: registerEditSelectMultipleAnswersOptions( n ), 
                                    onChange: ( value ) => {
                                        props.setAttributes( { multiple: value} )
                                    }
                                }),
                            ),
                            el( PanelRow, {}, 
                                el( TextControl, {
                                    label: __( 'Hint to the question', 'light-lms-quizz' ),
                                    help: __( 'The text as a hint above the choices', 'light-lms-quizz' ),
                                    value: props.attributes.hint,
                                    onChange: ( value ) => {
                                        props.setAttributes( { hint: value} )
                                    }
                                })
                            ),
                            el( PanelRow, {}, 
                                el( TextControl, {
                                    label: __( 'Button text', 'light-lms-quizz'),
                                    help: __( 'The text of the button to click on', 'light-lms-quizz'),
                                    value: props.attributes.buttonText,
                                    onChange: ( value ) => {
                                        props.setAttributes( { buttonText: value} )
                                    }
                                }),
                            ),
                            el( PanelRow, {}, 
                                el( TextareaControl, {
                                    label: __( 'Feedback when right', 'light-lms-quizz'),
                                    help: __( 'The feedback to show with a right answer', 'light-lms-quizz'), 
                                    value: props.attributes.feedback1,
                                    onChange: ( value ) => {
                                        if( value != "")
                                            props.setAttributes( { feedback1: value} )
                                    }
                                }),
                            ),
                            el( PanelRow, {},
                                el( TextareaControl, {
                                    label: __( 'Feedback when wrong', 'light-lms-quizz'),
                                    help: __( 'The feedback to show with a wrong answer', 'light-lms-quizz'), 
                                    value: props.attributes.feedback2,
                                    onChange: ( value ) => {
                                        if( value != "")
                                            props.setAttributes( { feedback2: value} )
                                    }
                                }),
                            )
                        ),

                        el( PanelBody, { 'title': __('Classes', 'light-lms-quizz') }, 
                            el( PanelRow, {
                                label:'OK',
                            },  
                                el( TextControl, {
                                    label: __( 'Form', 'light-lms-quizz'),
                                    help: __( 'The css class to apply to the form element', 'light-lms-quizz'),
                                    value: props.attributes.formClass,
                                    onChange: ( value ) => {
                                        props.setAttributes( { formClass: value} )
                                    }
                                }),
                            ),
                            el( PanelRow, {},
                                el( TextControl, {
                                    label: __( 'Feedback when right', 'light-lms-quizz'),
                                    help: __( 'The css class to apply to the feedback after right answer', 'light-lms-quizz'),
                                    value: props.attributes.feedback1Class,
                                    onChange: ( value ) => {
                                        props.setAttributes( { feedback1Class: value} )
                                    }
                                }),
                            ),
                            el( PanelRow, {},
                                el( TextControl, {
                                    label: __( 'Feedback when wrong', 'light-lms-quizz'),
                                    help: __( 'The css class to apply to the feedback after wrong answer', 'light-lms-quizz'),
                                    value: props.attributes.feedback2Class,
                                    onChange: ( value ) => {
                                        props.setAttributes( { feedback2Class: value} )
                                    }
                                }),
                            ),
                        ),
                        el( PanelBody, { title : __('Colors : ', 'light-lms-quizz') },
                            el( PanelColorSettings, {
                                title: __(' ... with right answer', 'light-lms-quizz'),
                                colorSettings: [
                                    {
                                        label: __('Feedback right background color', 'light-lms-quizz'),
                                        onChange: ( value ) => {
                                            props.setAttributes( { feedback1BgColor : value } )
                                        },
                                        value: props.attributes.feedback1BgColor
                                    },
                                    {
                                        label: __('Feedback right text color', 'light-lms-quizz'),
                                        onChange: ( value ) => {
                                            props.setAttributes( {feedback1TxtColor: value} )
                                        },
                                        value: props.attributes.feedback1TxtColor,
                                        colors: [{
                                            name: __('White', 'light-lms-quizz'),
                                            slug: __('White', 'light-lms-quizz'),
                                            color: '#ffffff'
                                        },
                                        {
                                            name: __('Black', 'light-lms-quizz'),
                                            slug: __('Black', 'light-lms-quizz'),
                                            color: '#000000'
                                        }]
                                    },
                                ]
                            }),
                            el( PanelColorSettings, {
                                title: __(' ... with wrong answer', 'light-lms-quizz'),
                                colorSettings:[
                                    {
                                        label: __('Feedback wrong background color', 'light-lms-quizz'),
                                        onChange: ( value ) => {
                                            props.setAttributes( {feedback2BgColor: value } )
                                        },
                                        value: props.attributes.feedback2BgColor
                                    },
                                    {
                                        label: __('feedback wrong text color', 'light-lms-quizz'),
                                        onChange: ( value ) => {
                                            props.setAttributes( {feedback2TxtColor: value} )
                                        },
                                        value: props.attributes.feedback2TxtColor,
                                        colors: [{
                                            name: __('White', 'light-lms-quizz'),
                                            slug: __('White', 'light-lms-quizz'),
                                            color: '#ffffff'
                                        },
                                        {
                                            name: __('Black', 'light-lms-quizz'),
                                            slug: __('Black', 'light-lms-quizz'),
                                            color: '#000000'
                                        }]
                                    },
                                ]
                            })
                        )
                    ])
                )
    }

    function registerSaveFormAttributes( props ){
        return {   
            action:'javascript:light_lms_evaluate_question("' + props.attributes.uniqueID + '")', 
            className:props.attributes.uniqueID + ' ' + props.attributes.formClass
        }
    }

    function registerSaveHiddenFields( props ){
        return [
            el( 'input', { 'type': 'hidden', 'name' : 'answer', 'value' : props.attributes.answer } ),
            el( 'input', { 'type': 'hidden', 'name' : 'feedback1', 'value' : props.attributes.feedback1 } ),
            el( 'input', { 'type': 'hidden', 'name' : 'feedback2', 'value' : props.attributes.feedback2 } ),
            el( 'input', { 'type': 'hidden', 'name' : 'multiple', 'value' : props.attributes.multiple } ),
            el( 'input', { 'type': 'hidden', 'name' : 'uniqueID', 'value': props.attributes.uniqueID} ),
            el( 'input', { 'type': 'hidden', 'name' : 'buttonText', 'value': props.attributes.buttonText} ),
            el( 'input', { 'type': 'hidden', 'name' : 'formClass', 'value': props.attributes.formClass} ),
            el( 'input', { 'type': 'hidden', 'name' : 'feedback1Class', 'value': props.attributes.feedback1Class} ),
            el( 'input', { 'type': 'hidden', 'name' : 'feedback2Class', 'value': props.attributes.feedback2Class} ),
            el( 'input', { 'type': 'hidden', 'name' : 'feedback1BgColor', 'value': props.attributes.feedback1BgColor} ),
            el( 'input', { 'type': 'hidden', 'name' : 'feedback1TxtColor', 'value': props.attributes.feedback1TxtColor} ),
            el( 'input', { 'type': 'hidden', 'name' : 'feedback2BgColor', 'value': props.attributes.feedback2BgColor} ),
            el( 'input', { 'type': 'hidden', 'name' : 'feedback2TxtColor', 'value': props.attributes.feedback2TxtColor} ),
            el( 'input', { 'type': 'hidden', 'name' : 'hint', 'value': props.attributes.hint} ),
            el( 'input', { 'type': 'hidden', 'name' : 'weight', 'value': props.attributes.weight} ),
            el( 'input', { 'type': 'hidden', 'name' : 'freeField1', 'value': props.attributes.freeField1} ),
            el( 'input', { 'type': 'hidden', 'name' : 'freeField3', 'value': props.attributes.freeField2} )
        ]
    }

    function registerSaveMultipleChoices( props, n ){
        var a3 = [
            el( RichText.Content, {
                tagName: 'p',
                value: props.attributes.content
            }), 
            el( 'div' , { className: ( parseInt(props.attributes.multiple) > 0 ? 'prerequisites': 'prerequisites hide')} ),
            el( 'div' , { className: 'row2 ' + (props.attributes.possibleAnswer1 ? '' : 'hide')}, 
                el( 'input', { type:'checkbox', name: 'A', formID :props.attributes.uniqueID }, el( 'span', {}, '' ) ),
                el( 'div', {
                    className: 'w90',
                    dangerouslySetInnerHTML: { __html:props.attributes.possibleAnswer1}, 
                    onclick: 'light_lms_cbLabelClicked("' + props.attributes.uniqueID + '", "A")'
                }),
            ),
            //el( CheckboxControl, { label: props.attributes.possibleAnswer1, checked:false }, el( 'span', {}, '')),
            el( 'div', { className: 'row2 ' + (props.attributes.possibleAnswer2 ? '' : 'hide')},
                el( 'input', { type:'checkbox', name: 'B', formID :props.attributes.uniqueID}, el( 'span', {}, '' ) ),
                el( 'div', {
                    className: 'w90',
                    dangerouslySetInnerHTML: { __html:props.attributes.possibleAnswer2}, 
                    onclick: 'light_lms_cbLabelClicked("' + props.attributes.uniqueID + '", "B")'

                }),
            ),
            el( 'div', {className: 'row2 ' + (props.attributes.possibleAnswer3 ? '' : 'hide')}, 
                el( 'input', { type:'checkbox', name: 'C', formID :props.attributes.uniqueID}, el( 'span', {}, '' ) ),
                el( 'div', {
                    className: 'w90',
                    dangerouslySetInnerHTML: { __html:props.attributes.possibleAnswer3}, 
                    onclick: 'light_lms_cbLabelClicked("' + props.attributes.uniqueID + '", "C")'

                }),
            )
        ]

        if(n == 3)
            return a3

        a3 = a3.concat([
            el( 'div', { className: 'row2 ' + (props.attributes.possibleAnswer4 ? '' : 'hide')},
                el( 'input', { type:'checkbox', name: 'D', formID :props.attributes.uniqueID}, el( 'span', {}, '' ) ),
                el( 'div', {
                    className: 'w90',
                    dangerouslySetInnerHTML: { __html:props.attributes.possibleAnswer4}, 
                    onclick: 'light_lms_cbLabelClicked("' + props.attributes.uniqueID + '", "D")'

                }),
            ),
            el( 'div', {className: 'row2 ' + (props.attributes.possibleAnswer5 ? '' : 'hide')}, 
                el( 'input', { type:'checkbox', name: 'E', formID :props.attributes.uniqueID}, el( 'span', {}, '' ) ),
                el( 'div', {
                    className: 'w90',
                    dangerouslySetInnerHTML: { __html:props.attributes.possibleAnswer5}, 
                    onclick: 'light_lms_cbLabelClicked("' + props.attributes.uniqueID + '", "E")'

                })
            )
        ])

        if( n == 5 )
            return a3

        if( n == 10 ){
            a3 = a3.concat( [
                el( 'div', {className: 'row2 ' + (props.attributes.possibleAnswer6 ? '' : 'hide')}, 
                    el( 'input', { type:'checkbox', name: 'F', formID :props.attributes.uniqueID}, el( 'span', {}, '' ) ),
                    el( 'div', {
                        className: 'w90',
                        dangerouslySetInnerHTML: { __html:props.attributes.possibleAnswer6}, 
                        onclick: 'light_lms_cbLabelClicked("' + props.attributes.uniqueID + '", "F")'

                    }),
                ),
                el( 'div', {className: 'row2 ' + (props.attributes.possibleAnswer7 ? '' : 'hide')}, 
                    el( 'input', { type:'checkbox', name: 'G', formID :props.attributes.uniqueID}, el( 'span', {}, '' ) ),
                    el( 'div', {
                        className: 'w90',
                        dangerouslySetInnerHTML: { __html:props.attributes.possibleAnswer7}, 
                        onclick: 'light_lms_cbLabelClicked("' + props.attributes.uniqueID + '", "G")'

                    }),
                ),
                el( 'div', {className: 'row2 ' + (props.attributes.possibleAnswer8 ? '' : 'hide')}, 
                    el( 'input', { type:'checkbox', name: 'H', formID :props.attributes.uniqueID}, el( 'span', {}, '' ) ),
                    el( 'div', {
                        className: 'w90',
                        dangerouslySetInnerHTML: { __html:props.attributes.possibleAnswer8}, 
                        onclick: 'light_lms_cbLabelClicked("' + props.attributes.uniqueID + '", "H")'

                    }),
                ),
                el( 'div', {className: 'row2 ' + (props.attributes.possibleAnswer9 ? '' : 'hide')}, 
                    el( 'input', { type:'checkbox', name: 'I', formID :props.attributes.uniqueID}, el( 'span', {}, '' ) ),
                    el( 'div', {
                        className: 'w90',
                        dangerouslySetInnerHTML: { __html:props.attributes.possibleAnswer9}, 
                        onclick: 'light_lms_cbLabelClicked("' + props.attributes.uniqueID + '", "I")'

                    }),
                ),
                el( 'div', {className: 'row2 ' + (props.attributes.possibleAnswer10 ? '' : 'hide')}, 
                    el( 'input', { type:'checkbox', name: 'J', formID :props.attributes.uniqueID}, el( 'span', {}, '' ) ),
                    el( 'div', {
                        className: 'w90',
                        dangerouslySetInnerHTML: { __html:props.attributes.possibleAnswer10}, 
                        onclick: 'light_lms_cbLabelClicked("' + props.attributes.uniqueID + '", "J")'

                    }),
                )
            ] )
        }

        return a3
    }

    function registerSaveFeedback( props ){
        return [
            el( 'div', { 
                className: 'feedback1 hide ' + props.attributes.feedback1Class 
                }, 
                props.attributes.feedback1 
            ),
            el( 'div', { 
                    className: 'feedback2 hide ' + props.attributes.feedback2Class 
                }, 
                props.attributes.feedback2 
            )
        ]
    }

    function registerSaveButton( props ){
        return el( 'p', null,  el( 'button', {}, props.attributes.buttonText) )

    }

    registerBlockType('light-lms-quizz/choose3', {
        title: registerTitle(3),
        category: 'light-lms-quizz',
        icon: svgIcon3,
        description: __( 'Learning in progress', 'light-lms-quizz'),
        keywords: [ __('question', 'light-lms-quizz'), __('multiple choice', 'light-lms-quizz')],
    
        attributes: registerAttributes( 3 ),
     
        edit: function( props ) {
    
            props = registerBeforeEdit( props )
    
            return [
                registerEditQuestion( props ), 

                registerEditAnswers( props, 3 ),
                [
                    registerEditControls( props, 3 )
                ]
            ]
        },
    
        save: function( props ){
    
            return el( 
                'form', 
                registerSaveFormAttributes( props ), 
                registerSaveHiddenFields( props ),
                registerSaveMultipleChoices( props, 3 ),
                registerSaveFeedback( props ),
                registerSaveButton( props )
            )
        }
    });

    registerBlockType('light-lms-quizz/choose5', {
        title: registerTitle(5),
        category: 'light-lms-quizz',
        icon: svgIcon5,
        description: __( 'Learning in progress', 'light-lms-quizz'),
        keywords: [ __('question', 'light-lms-quizz'), __('multiple choice', 'light-lms-quizz')],
    
        attributes: registerAttributes( 5 ),
     
        edit: function( props ) {
    
            props = registerBeforeEdit( props )
    
            return [
                registerEditQuestion( props ), 

                registerEditAnswers( props, 5 ),
                [
                    registerEditControls( props, 5 )
                ]
            ]
        },
    
        save: function( props ){
    
            return el( 
                'form', 
                registerSaveFormAttributes( props ), 
                registerSaveHiddenFields( props ),
                registerSaveMultipleChoices( props, 5 ),
                registerSaveFeedback( props ),
                registerSaveButton( props )
            )
        }
    });

    registerBlockType('light-lms-quizz/choose10', {
        title: registerTitle(10),
        category: 'light-lms-quizz',
        icon: svgIcon10,
        description: __( 'Learning in progress', 'light-lms-quizz'),
        keywords: [ __('question', 'light-lms-quizz'), __('multiple choice', 'light-lms-quizz')],
    
        attributes: registerAttributes( 10 ),
     
        edit: function( props ) {
    
            props = registerBeforeEdit( props )
    
            return [
                registerEditQuestion( props ), 

                registerEditAnswers( props, 10 ),
                [
                    registerEditControls( props, 10 )
                ]
            ]
        },
    
        save: function( props ){
    
            return el( 
                'form', 
                registerSaveFormAttributes( props ), 
                registerSaveHiddenFields( props ),
                registerSaveMultipleChoices( props, 10 ),
                registerSaveFeedback( props ),
                registerSaveButton( props )
            )
        }
    });
}())