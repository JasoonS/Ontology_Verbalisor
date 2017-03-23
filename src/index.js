import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import App from './containers/App'
import './index.css'

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)


var http = new XMLHttpRequest();
var url = "http://192.168.0.14:5123/";
var params = "name=xml&value=hello"
var acetextinsoapxml = `<?xml version="1.0"?>
<Ontology xmlns="http://www.w3.org/2002/07/owl#"
     xml:base="http://org.semanticweb.ontologies/test"
         xmlns:xml="http://www.w3.org/XML/1998/namespace">

    <Prefix name="story" IRI="http://www.example.org/story.owl#"/>
    <Prefix name="ace_lexicon" IRI="http://attempto.ifi.uzh.ch/ace_lexicon#"/>

    <AnnotationAssertion>
        <AnnotationProperty abbreviatedIRI="ace_lexicon:TV_sg"/>
                <IRI>http://www.example.org/story.owl#eat</IRI>
        <Literal>eats</Literal>
    </AnnotationAssertion>

    <AnnotationAssertion>
        <AnnotationProperty abbreviatedIRI="ace_lexicon:TV_pl"/>
                <IRI>http://www.example.org/story.owl#eat</IRI>
        <Literal>eat</Literal>
    </AnnotationAssertion>

    <AnnotationAssertion>
        <AnnotationProperty abbreviatedIRI="ace_lexicon:TV_vbg"/>
                <IRI>http://www.example.org/story.owl#eat</IRI>
        <Literal>eaten</Literal>
    </AnnotationAssertion>

    <AnnotationAssertion>
        <AnnotationProperty abbreviatedIRI="ace_lexicon:CN_sg"/>
                <IRI>http://www.example.org/story.owl#hate</IRI>
        <Literal>hater</Literal>
    </AnnotationAssertion>

    <AnnotationAssertion>
        <AnnotationProperty abbreviatedIRI="ace_lexicon:CN_pl"/>
                <IRI>http://www.example.org/story.owl#leaf</IRI>
        <Literal>leaves</Literal>
    </AnnotationAssertion>

    <SubClassOf>
        <Class abbreviatedIRI="story:animal"/>
        <ObjectUnionOf>
            <Class abbreviatedIRI="story:cat"/>
            <Class abbreviatedIRI="story:goat"/>
        </ObjectUnionOf>
    </SubClassOf>
    <EquivalentClasses>
        <Class abbreviatedIRI="story:goat"/>
        <ObjectAllValuesFrom>
            <ObjectProperty abbreviatedIRI="story:eat"/>
            <Class abbreviatedIRI="story:leaf"/>
        </ObjectAllValuesFrom>
    </EquivalentClasses>
    <SubClassOf>
        <Class abbreviatedIRI="story:human"/>
        <ObjectIntersectionOf>
            <Class abbreviatedIRI="story:person"/>
            <ObjectSomeValuesFrom>
                <ObjectProperty abbreviatedIRI="story:own"/>
                <Class abbreviatedIRI="story:automobile"/>
            </ObjectSomeValuesFrom>
        </ObjectIntersectionOf>
    </SubClassOf>
    <SubClassOf>
        <Class abbreviatedIRI="story:human"/>
        <ObjectOneOf>
            <NamedIndividual abbreviatedIRI="story:John"/>
            <NamedIndividual abbreviatedIRI="story:Mary"/>
        </ObjectOneOf>
    </SubClassOf>
    <SubClassOf>
        <Class abbreviatedIRI="story:man"/>
        <Class abbreviatedIRI="story:person"/>
    </SubClassOf>
    <FunctionalObjectProperty>
        <ObjectProperty abbreviatedIRI="story:eat"/>
    </FunctionalObjectProperty>
    <InverseFunctionalObjectProperty>
        <ObjectProperty abbreviatedIRI="story:eat"/>
    </InverseFunctionalObjectProperty>
    <TransitiveObjectProperty>
        <ObjectProperty abbreviatedIRI="story:eat"/>
    </TransitiveObjectProperty>
    <ObjectPropertyDomain>
        <ObjectProperty abbreviatedIRI="story:eat"/>
        <Class abbreviatedIRI="story:animal"/>
    </ObjectPropertyDomain>
    <ObjectPropertyRange>
        <ObjectProperty abbreviatedIRI="story:eat"/>
        <ObjectIntersectionOf>
            <Class abbreviatedIRI="story:food"/>
            <ObjectComplementOf>
                <Class abbreviatedIRI="story:automobile"/>
            </ObjectComplementOf>
        </ObjectIntersectionOf>
    </ObjectPropertyRange>
    <InverseObjectProperties>
        <ObjectProperty abbreviatedIRI="story:hate"/>
        <ObjectProperty abbreviatedIRI="story:eat"/>
    </InverseObjectProperties>
    <ClassAssertion>
        <Class abbreviatedIRI="story:man"/>
        <NamedIndividual abbreviatedIRI="story:John"/>
    </ClassAssertion>
    <SubClassOf>
        <ObjectUnionOf>
            <Class abbreviatedIRI="story:apple"/>
            <Class abbreviatedIRI="story:leaf"/>
        </ObjectUnionOf>
        <Class abbreviatedIRI="story:food"/>
    </SubClassOf>
</Ontology>`;
http.open("POST", url, true);

//Send the proper header information along with the request
//http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http.setRequestHeader("Access-Control-Allow-Origin", "*");


http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
        document.getElementById("spacer").innerHTML = http.responseText;
    }
    console.log(this.responseText);
}
http.send(params);
