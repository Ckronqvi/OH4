# OH4
Reactilla ja Spring-bootilla tehty verkkokauppa.

## Ominaisuudet:
* Käyttäjätilin luominen
* Sisäänkirjautuminen ja JWT session hallinta
* Ilmoituksien selaaminenen ja lisääminen

## Mitä tarvitset:
* JDK 17+
* Maven
* Node.js
* npm
* MySQL

## Kuinka käynnistää:
### Backend:
* ***src/main/resources/application.properties*** tiedostoon MySQL tietokannan sijainti ja käyttäjätunnukset
* `mvn clean package`
* `java -jar demo-0.0.1-SNAPSHOT.jar`

### Frontend:
* `npm install`
* `npm start`
