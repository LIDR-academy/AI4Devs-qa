```
    Model: Claude 3.7 Sonet
```
# PROMPT #1: ask


```
    # Rol
    Eres un experto en testing End To End con conocimientos avanzados en Cypress.

    # Contexto
    - Estamos desarrollando un software de gestión de candidatos "LTS" par ala empresa LTI.
    - Nos han pedido que desarrollemos los tests de una aplicación de frontend desarrollada en react.
    - Nos han pedido que lo hagamos con cypress.
    - Ya he instalado cypress y he hecho un primer test de ejemplo en @position.cy.js 
    - La configuración cypress la tenemos en @cypress.config.ts 

    # Consideraciones
    - Usaremos los atributos data-test-id=* para comprobar los elementos del DOM.

    # Tarea
    - Analiza el código de frontend para comprender como está estructurado el sistema y poder realizar operaciones de testing.
    - Pregúntame si tienes dudas sobre algún concepto.

    # Salida
    - Devuelve la estructura del proyecto el informe del análisis que has hecho del sistema.

    No escribas código todavía. 
```


# PROMPT #2: ask
```
perfecto. 
- Ahora siguiendo el archivo @position.cy.js vamos a completar la función :  Can Access to the position page. 
- Actualmente se comprueba que la página de listado de posiciones se muestra correctamente. 
- Debemos ahora en la misma función agregar el test de que se busque el primer botón que encuentre de "Ver Proceso" (usando siempre atributos de data-test-id) para hacer click en él.

Descríbeme el proceso paso a paso que seguirás. No escribas código todavía.
```

# PROMPT #3: agent
```
Perfecto. Implementa estas modificaciones.
```


# PROMPT #4: ask
```
Perfecto. 
- Ahora siguiendo el mismo mecanismo que anteriormente, debemos probar: Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.
- Debemos seguir haciéndolo en la función 'Can Access to the position page' de @position.cy.js 

Descríbeme el proceso paso a paso que seguirás. No escribas código todavía.
```


# PROMPT #5: ask
```
Examina primero el positionDetail.js. @PositionDetails.js 

No implementes código todavía. 
```


# PROMPT #6: ask
```
Examina primero el positionDetail.js. @PositionDetails.js 

No implementes código todavía. 
```


# PROMPT #7: ask
```
Perfecto. 
- Explícame el plan que vas a usar paso a paso para implementar el test en la función 'Can Access to the position page': Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.

- No escribas código todavía.
```



# PROMPT #8: agent
```
Ok. Implementa el test.
```

# PROMPT #9: ask
```
- Ahora vamos a desarrollar un nuevo test en @position.cy.js .
- Debemos desarrollarlo en un nuevo it().
- El test debe cumplir la siguiente directriz:
    - Simular el arrastre de una tarjeta de candidato de una tarjeta a otra.

# Consideraciones
- Las tarjetas de los candidatos tienen la funcionalidad de poder arrastrarse ya incorporada.
- Cada vez que se arrastra una tarjeta de candidato se hace una llamada al backend para cambiar su posición en base de datos.

# Tarea
- Analiza las partes afectadas para poder desarrollar este test.
- Devuelve un informe con los pasos que seguirás para poder implementar este test.

No escribas código todavía.
```

# PROMPT #10: agent
```
Ok, implementa el test en @position.cy.js dentro del test 'Test positions page' siguiendo el plan.
```
