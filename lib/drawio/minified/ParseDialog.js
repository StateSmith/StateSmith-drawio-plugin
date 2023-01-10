var ParseDialog = function(b, e, f) {
  function c(d, g, n) {
    var v = d.split('\n');
    if ('plantUmlPng' == g || 'plantUmlSvg' == g || 'plantUmlTxt' == g) {
      if (b.spinner.spin(document.body, mxResources.get('inserting'))) {
        var u = function(P, O, W, p, B) {
            m = mxEvent.isAltDown(n) ? m : x.getCenterInsertPoint(new mxRectangle(0, 0, p, B));
            var N = null;
            x.getModel().beginUpdate();
            try {
              N = 'txt' == O ? b.insertAsPreText(W, m.x, m.y) : x.insertVertex(null, null, null, m.x, m.y, p, B, 'shape=image;noLabel=1;verticalAlign=top;aspect=fixed;imageAspect=0;image=' + b.convertDataUri(W) + ';'), x.setAttributeForCell(N, 'plantUmlData', JSON.stringify({
                data: P,
                format: O
              }, null, 2));
            } finally {
              x.getModel().endUpdate();
            }
            null != N && (x.setSelectionCell(N), x.scrollCellToVisible(N));
          },
          x = b.editor.graph,
          C = 'plantUmlTxt' == g ? 'txt' : 'plantUmlPng' == g ? 'png' : 'svg';
        '@startuml\nskinparam shadowing false\nAlice -> Bob: Authentication Request\nBob --> Alice: Authentication Response\n\nAlice -> Bob: Another authentication Request\nAlice <-- Bob: Another authentication Response\n@enduml' == d && 'svg' == C ? window.setTimeout(function() {
          b.spinner.stop();
          u(d, C, 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb250ZW50U2NyaXB0VHlwZT0iYXBwbGljYXRpb24vZWNtYXNjcmlwdCIgY29udGVudFN0eWxlVHlwZT0idGV4dC9jc3MiIGhlaWdodD0iMjEycHgiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHN0eWxlPSJ3aWR0aDoyOTVweDtoZWlnaHQ6MjEycHg7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyOTUgMjEyIiB3aWR0aD0iMjk1cHgiIHpvb21BbmRQYW49Im1hZ25pZnkiPjxkZWZzLz48Zz48bGluZSBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsgc3Ryb2tlLWRhc2hhcnJheTogNS4wLDUuMDsiIHgxPSIzMSIgeDI9IjMxIiB5MT0iMzQuNDg4MyIgeTI9IjE3MS43MzA1Ii8+PGxpbmUgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjA7IHN0cm9rZS1kYXNoYXJyYXk6IDUuMCw1LjA7IiB4MT0iMjY0LjUiIHgyPSIyNjQuNSIgeTE9IjM0LjQ4ODMiIHkyPSIxNzEuNzMwNSIvPjxyZWN0IGZpbGw9IiNGRUZFQ0UiIGhlaWdodD0iMzAuNDg4MyIgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjU7IiB3aWR0aD0iNDciIHg9IjgiIHk9IjMiLz48dGV4dCBmaWxsPSIjMDAwMDAwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgbGVuZ3RoQWRqdXN0PSJzcGFjaW5nQW5kR2x5cGhzIiB0ZXh0TGVuZ3RoPSIzMyIgeD0iMTUiIHk9IjIzLjUzNTIiPkFsaWNlPC90ZXh0PjxyZWN0IGZpbGw9IiNGRUZFQ0UiIGhlaWdodD0iMzAuNDg4MyIgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjU7IiB3aWR0aD0iNDciIHg9IjgiIHk9IjE3MC43MzA1Ii8+PHRleHQgZmlsbD0iIzAwMDAwMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGxlbmd0aEFkanVzdD0ic3BhY2luZ0FuZEdseXBocyIgdGV4dExlbmd0aD0iMzMiIHg9IjE1IiB5PSIxOTEuMjY1NiI+QWxpY2U8L3RleHQ+PHJlY3QgZmlsbD0iI0ZFRkVDRSIgaGVpZ2h0PSIzMC40ODgzIiBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuNTsiIHdpZHRoPSI0MCIgeD0iMjQ0LjUiIHk9IjMiLz48dGV4dCBmaWxsPSIjMDAwMDAwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgbGVuZ3RoQWRqdXN0PSJzcGFjaW5nQW5kR2x5cGhzIiB0ZXh0TGVuZ3RoPSIyNiIgeD0iMjUxLjUiIHk9IjIzLjUzNTIiPkJvYjwvdGV4dD48cmVjdCBmaWxsPSIjRkVGRUNFIiBoZWlnaHQ9IjMwLjQ4ODMiIHN0eWxlPSJzdHJva2U6ICNBODAwMzY7IHN0cm9rZS13aWR0aDogMS41OyIgd2lkdGg9IjQwIiB4PSIyNDQuNSIgeT0iMTcwLjczMDUiLz48dGV4dCBmaWxsPSIjMDAwMDAwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgbGVuZ3RoQWRqdXN0PSJzcGFjaW5nQW5kR2x5cGhzIiB0ZXh0TGVuZ3RoPSIyNiIgeD0iMjUxLjUiIHk9IjE5MS4yNjU2Ij5Cb2I8L3RleHQ+PHBvbHlnb24gZmlsbD0iI0E4MDAzNiIgcG9pbnRzPSIyNTIuNSw2MS43OTg4LDI2Mi41LDY1Ljc5ODgsMjUyLjUsNjkuNzk4OCwyNTYuNSw2NS43OTg4IiBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiLz48bGluZSBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiIHgxPSIzMS41IiB4Mj0iMjU4LjUiIHkxPSI2NS43OTg4IiB5Mj0iNjUuNzk4OCIvPjx0ZXh0IGZpbGw9IiMwMDAwMDAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjEzIiBsZW5ndGhBZGp1c3Q9InNwYWNpbmdBbmRHbHlwaHMiIHRleHRMZW5ndGg9IjE0NyIgeD0iMzguNSIgeT0iNjEuMDU2NiI+QXV0aGVudGljYXRpb24gUmVxdWVzdDwvdGV4dD48cG9seWdvbiBmaWxsPSIjQTgwMDM2IiBwb2ludHM9IjQyLjUsOTEuMTA5NCwzMi41LDk1LjEwOTQsNDIuNSw5OS4xMDk0LDM4LjUsOTUuMTA5NCIgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjA7Ii8+PGxpbmUgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjA7IHN0cm9rZS1kYXNoYXJyYXk6IDIuMCwyLjA7IiB4MT0iMzYuNSIgeDI9IjI2My41IiB5MT0iOTUuMTA5NCIgeTI9Ijk1LjEwOTQiLz48dGV4dCBmaWxsPSIjMDAwMDAwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMyIgbGVuZ3RoQWRqdXN0PSJzcGFjaW5nQW5kR2x5cGhzIiB0ZXh0TGVuZ3RoPSIxNTciIHg9IjQ4LjUiIHk9IjkwLjM2NzIiPkF1dGhlbnRpY2F0aW9uIFJlc3BvbnNlPC90ZXh0Pjxwb2x5Z29uIGZpbGw9IiNBODAwMzYiIHBvaW50cz0iMjUyLjUsMTIwLjQxOTksMjYyLjUsMTI0LjQxOTksMjUyLjUsMTI4LjQxOTksMjU2LjUsMTI0LjQxOTkiIHN0eWxlPSJzdHJva2U6ICNBODAwMzY7IHN0cm9rZS13aWR0aDogMS4wOyIvPjxsaW5lIHN0eWxlPSJzdHJva2U6ICNBODAwMzY7IHN0cm9rZS13aWR0aDogMS4wOyIgeDE9IjMxLjUiIHgyPSIyNTguNSIgeTE9IjEyNC40MTk5IiB5Mj0iMTI0LjQxOTkiLz48dGV4dCBmaWxsPSIjMDAwMDAwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMyIgbGVuZ3RoQWRqdXN0PSJzcGFjaW5nQW5kR2x5cGhzIiB0ZXh0TGVuZ3RoPSIxOTkiIHg9IjM4LjUiIHk9IjExOS42Nzc3Ij5Bbm90aGVyIGF1dGhlbnRpY2F0aW9uIFJlcXVlc3Q8L3RleHQ+PHBvbHlnb24gZmlsbD0iI0E4MDAzNiIgcG9pbnRzPSI0Mi41LDE0OS43MzA1LDMyLjUsMTUzLjczMDUsNDIuNSwxNTcuNzMwNSwzOC41LDE1My43MzA1IiBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiLz48bGluZSBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsgc3Ryb2tlLWRhc2hhcnJheTogMi4wLDIuMDsiIHgxPSIzNi41IiB4Mj0iMjYzLjUiIHkxPSIxNTMuNzMwNSIgeTI9IjE1My43MzA1Ii8+PHRleHQgZmlsbD0iIzAwMDAwMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTMiIGxlbmd0aEFkanVzdD0ic3BhY2luZ0FuZEdseXBocyIgdGV4dExlbmd0aD0iMjA5IiB4PSI0OC41IiB5PSIxNDguOTg4MyI+QW5vdGhlciBhdXRoZW50aWNhdGlvbiBSZXNwb25zZTwvdGV4dD48IS0tTUQ1PVs3ZjNlNGQwYzkwMWVmZGJjNTdlYjQ0MjQ5YTNiODE5N10KQHN0YXJ0dW1sDQpza2lucGFyYW0gc2hhZG93aW5nIGZhbHNlDQpBbGljZSAtPiBCb2I6IEF1dGhlbnRpY2F0aW9uIFJlcXVlc3QNCkJvYiAtIC0+IEFsaWNlOiBBdXRoZW50aWNhdGlvbiBSZXNwb25zZQ0KDQpBbGljZSAtPiBCb2I6IEFub3RoZXIgYXV0aGVudGljYXRpb24gUmVxdWVzdA0KQWxpY2UgPC0gLSBCb2I6IEFub3RoZXIgYXV0aGVudGljYXRpb24gUmVzcG9uc2UNCkBlbmR1bWwNCgpQbGFudFVNTCB2ZXJzaW9uIDEuMjAyMC4wMihTdW4gTWFyIDAxIDA0OjIyOjA3IENTVCAyMDIwKQooTUlUIHNvdXJjZSBkaXN0cmlidXRpb24pCkphdmEgUnVudGltZTogT3BlbkpESyBSdW50aW1lIEVudmlyb25tZW50CkpWTTogT3BlbkpESyA2NC1CaXQgU2VydmVyIFZNCkphdmEgVmVyc2lvbjogMTIrMzMKT3BlcmF0aW5nIFN5c3RlbTogTWFjIE9TIFgKRGVmYXVsdCBFbmNvZGluZzogVVRGLTgKTGFuZ3VhZ2U6IGVuCkNvdW50cnk6IFVTCi0tPjwvZz48L3N2Zz4=', 295, 212);
        }, 200) : b.generatePlantUmlImage(d, C, function(P, O, W) {
          b.spinner.stop();
          u(d, C, P, O, W);
        }, function(P) {
          b.handleError(P);
        });
      }
    } else if ('mermaid' == g)
      b.spinner.spin(document.body, mxResources.get('inserting')) && (x = b.editor.graph, b.generateMermaidImage(d, C, function(P, O, W) {
        m = mxEvent.isAltDown(n) ? m : x.getCenterInsertPoint(new mxRectangle(0, 0, O, W));
        b.spinner.stop();
        var p = null;
        x.getModel().beginUpdate();
        try {
          p = x.insertVertex(null, null, null, m.x, m.y, O, W, 'shape=image;noLabel=1;verticalAlign=top;imageAspect=1;image=' + P + ';'), x.setAttributeForCell(p, 'mermaidData', JSON.stringify({
            data: d,
            config: EditorUi.defaultMermaidConfig
          }, null, 2));
        } finally {
          x.getModel().endUpdate();
        }
        null != p && (x.setSelectionCell(p), x.scrollCellToVisible(p));
      }, function(P) {
        b.handleError(P);
      }));
    else if ('table' == g) {
      g = null;
      for (var F = [], L = 0, l = {}, q = 0; q < v.length; q++) {
        var A = mxUtils.trim(v[q]);
        if ('primary key' == A.substring(0, 11).toLowerCase()) {
          var H = A.match(/\((.+)\)/);
          H && H[1] && (l[H[1]] = !0);
          v.splice(q, 1);
        } else
          0 < A.toLowerCase().indexOf('primary key') && (l[A.split(' ')[0]] = !0, v[q] = mxUtils.trim(A.replace(/primary key/i, '')));
      }
      for (q = 0; q < v.length; q++)
        if (A = mxUtils.trim(v[q]), 'create table' == A.substring(0, 12).toLowerCase())
          A = mxUtils.trim(A.substring(12)), '(' == A.charAt(A.length - 1) && (A = mxUtils.trim(A.substring(0, A.length - 1))), g = new mxCell(A, new mxGeometry(L, 0, 160, 40), 'shape=table;startSize=30;container=1;collapsible=1;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;align=center;resizeLast=1;'), g.vertex = !0, F.push(g), A = b.editor.graph.getPreferredSizeForCell(K), null != A && (g.geometry.width = A.width + 10);
        else if (null != g && ')' == A.charAt(0))
        L += g.geometry.width + 40, g = null;
      else if ('(' != A && null != g) {
        A = A.substring(0, ',' == A.charAt(A.length - 1) ? A.length - 1 : A.length);
        H = l[A.split(' ')[0]];
        var K = new mxCell('', new mxGeometry(0, 0, 160, 30), 'shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;fillColor=none;collapsible=0;dropTarget=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;top=0;left=0;right=0;bottom=' + (H ? '1' : '0') + ';');
        K.vertex = !0;
        var M = new mxCell(H ? 'PK' : '', new mxGeometry(0, 0, 30, 30), 'shape=partialRectangle;overflow=hidden;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;' + (H ? 'fontStyle=1;' : ''));
        M.vertex = !0;
        K.insert(M);
        A = new mxCell(A, new mxGeometry(30, 0, 130, 30), 'shape=partialRectangle;overflow=hidden;connectable=0;fillColor=none;align=left;top=0;left=0;bottom=0;right=0;spacingLeft=6;' + (H ? 'fontStyle=5;' : ''));
        A.vertex = !0;
        K.insert(A);
        A = b.editor.graph.getPreferredSizeForCell(A);
        null != A && g.geometry.width < A.width + 30 && (g.geometry.width = Math.min(320, Math.max(g.geometry.width, A.width + 30)));
        g.insert(K, H ? 0 : null);
        g.geometry.height += 30;
      }
      0 < F.length && (x = b.editor.graph, m = mxEvent.isAltDown(n) ? m : x.getCenterInsertPoint(x.getBoundingBoxFromGeometry(F, !0)), x.setSelectionCells(x.importCells(F, m.x, m.y)), x.scrollCellToVisible(x.getSelectionCell()));
    } else if ('list' == g) {
      if (0 < v.length) {
        x = b.editor.graph;
        K = null;
        F = [];
        for (q = g = 0; q < v.length; q++)
          ';' != v[q].charAt(0) && (0 == v[q].length ? K = null : null == K ? (K = new mxCell(v[q], new mxGeometry(g, 0, 160, 30), 'swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;'), K.vertex = !0, F.push(K), A = x.getPreferredSizeForCell(K), null != A && K.geometry.width < A.width + 10 && (K.geometry.width = A.width + 10), g += K.geometry.width + 40) : '--' == v[q] ? (A = new mxCell('', new mxGeometry(0, 0, 40, 8), 'line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;'), A.vertex = !0, K.geometry.height += A.geometry.height, K.insert(A)) : 0 < v[q].length && (L = new mxCell(v[q], new mxGeometry(0, 0, 60, 26), 'text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;'), L.vertex = !0, A = x.getPreferredSizeForCell(L), null != A && L.geometry.width < A.width && (L.geometry.width = A.width), K.geometry.width = Math.max(K.geometry.width, L.geometry.width), K.geometry.height += L.geometry.height, K.insert(L)));
        if (0 < F.length) {
          m = mxEvent.isAltDown(n) ? m : x.getCenterInsertPoint(x.getBoundingBoxFromGeometry(F, !0));
          x.getModel().beginUpdate();
          try {
            F = x.importCells(F, m.x, m.y);
            A = [];
            for (q = 0; q < F.length; q++)
              A.push(F[q]), A = A.concat(F[q].children);
            x.fireEvent(new mxEventObject('cellsInserted', 'cells', A));
          } finally {
            x.getModel().endUpdate();
          }
          x.setSelectionCells(F);
          x.scrollCellToVisible(x.getSelectionCell());
        }
      }
    } else {
      K = function(P) {
        var O = I[P];
        null == O && (O = new mxCell(P, new mxGeometry(0, 0, 80, 30), 'whiteSpace=wrap;html=1;'), O.vertex = !0, I[P] = O, F.push(O));
        return O;
      };
      var I = {};
      F = [];
      for (q = 0; q < v.length; q++)
        if (';' != v[q].charAt(0)) {
          var Q = v[q].split('->');
          2 <= Q.length && (H = K(Q[0]), M = K(Q[Q.length - 1]), Q = new mxCell(2 < Q.length ? Q[1] : '', new mxGeometry()), Q.edge = !0, H.insertEdge(Q, !0), M.insertEdge(Q, !1), F.push(Q));
        }
      if (0 < F.length) {
        v = document.createElement('div');
        v.style.visibility = 'hidden';
        document.body.appendChild(v);
        x = new Graph(v);
        x.getModel().beginUpdate();
        try {
          F = x.importCells(F);
          for (q = 0; q < F.length; q++)
            x.getModel().isVertex(F[q]) && (A = x.getPreferredSizeForCell(F[q]), F[q].geometry.width = Math.max(F[q].geometry.width, A.width), F[q].geometry.height = Math.max(F[q].geometry.height, A.height));
          q = !0;
          'horizontalFlow' == g || 'verticalFlow' == g ? (new mxHierarchicalLayout(x, 'horizontalFlow' == g ? mxConstants.DIRECTION_WEST : mxConstants.DIRECTION_NORTH).execute(x.getDefaultParent(), F), q = !1) : 'circle' == g ? new mxCircleLayout(x).execute(x.getDefaultParent()) : (L = new mxFastOrganicLayout(x), L.disableEdgeStyle = !1, L.forceConstant = 180, L.execute(x.getDefaultParent()));
          q && (l = new mxParallelEdgeLayout(x), l.spacing = 30, l.execute(x.getDefaultParent()));
        } finally {
          x.getModel().endUpdate();
        }
        x.clearCellOverlays();
        A = [];
        b.editor.graph.getModel().beginUpdate();
        try {
          F = x.getModel().getChildren(x.getDefaultParent()), m = mxEvent.isAltDown(n) ? m : b.editor.graph.getCenterInsertPoint(x.getBoundingBoxFromGeometry(F, !0)), A = b.editor.graph.importCells(F, m.x, m.y), b.editor.graph.fireEvent(new mxEventObject('cellsInserted', 'cells', A));
        } finally {
          b.editor.graph.getModel().endUpdate();
        }
        b.editor.graph.setSelectionCells(A);
        b.editor.graph.scrollCellToVisible(b.editor.graph.getSelectionCell());
        x.destroy();
        v.parentNode.removeChild(v);
      }
    }
  }

  function k() {
    return 'list' == y.value ? 'Person\n-name: String\n-birthDate: Date\n--\n+getName(): String\n+setName(String): void\n+isBirthday(): boolean\n\nAddress\n-street: String\n-city: String\n-state: String' : 'mermaid' == y.value ? 'graph TD;\n  A-->B;\n  A-->C;\n  B-->D;\n  C-->D;' : 'table' == y.value ? 'CREATE TABLE Suppliers\n(\nsupplier_id int NOT NULL PRIMARY KEY,\nsupplier_name char(50) NOT NULL,\ncontact_name char(50),\n);\nCREATE TABLE Customers\n(\ncustomer_id int NOT NULL PRIMARY KEY,\ncustomer_name char(50) NOT NULL,\naddress char(50),\ncity char(50),\nstate char(25),\nzip_code char(10)\n);\n' : 'plantUmlPng' == y.value ? '@startuml\nskinparam backgroundcolor transparent\nskinparam shadowing false\nAlice -> Bob: Authentication Request\nBob --> Alice: Authentication Response\n\nAlice -> Bob: Another authentication Request\nAlice <-- Bob: Another authentication Response\n@enduml' : 'plantUmlSvg' == y.value || 'plantUmlTxt' == y.value ? '@startuml\nskinparam shadowing false\nAlice -> Bob: Authentication Request\nBob --> Alice: Authentication Response\n\nAlice -> Bob: Another authentication Request\nAlice <-- Bob: Another authentication Response\n@enduml' : ';Example:\na->b\nb->edge label->c\nc->a\n';
  }
  var m = b.editor.graph.getFreeInsertPoint();
  e = document.createElement('div');
  e.style.textAlign = 'right';
  var t = document.createElement('textarea');
  t.style.boxSizing = 'border-box';
  t.style.resize = 'none';
  t.style.width = '100%';
  t.style.height = '354px';
  t.style.marginBottom = '16px';
  var y = document.createElement('select');
  if ('formatSql' == f || 'mermaid' == f)
    y.style.display = 'none';
  var E = document.createElement('option');
  E.setAttribute('value', 'list');
  mxUtils.write(E, mxResources.get('list'));
  'plantUml' != f && y.appendChild(E);
  null != f && 'fromText' != f || E.setAttribute('selected', 'selected');
  E = document.createElement('option');
  E.setAttribute('value', 'table');
  mxUtils.write(E, mxResources.get('formatSql'));
  'formatSql' == f && (y.appendChild(E), E.setAttribute('selected', 'selected'));
  E = document.createElement('option');
  E.setAttribute('value', 'mermaid');
  mxUtils.write(E, mxResources.get('formatSql'));
  'mermaid' == f && (y.appendChild(E), E.setAttribute('selected', 'selected'));
  E = document.createElement('option');
  E.setAttribute('value', 'diagram');
  mxUtils.write(E, mxResources.get('diagram'));
  var z = document.createElement('option');
  z.setAttribute('value', 'circle');
  mxUtils.write(z, mxResources.get('circle'));
  var D = document.createElement('option');
  D.setAttribute('value', 'horizontalFlow');
  mxUtils.write(D, mxResources.get('horizontalFlow'));
  var J = document.createElement('option');
  J.setAttribute('value', 'verticalFlow');
  mxUtils.write(J, mxResources.get('verticalFlow'));
  'plantUml' != f && (y.appendChild(E), y.appendChild(z), y.appendChild(D), y.appendChild(J));
  E = document.createElement('option');
  E.setAttribute('value', 'plantUmlSvg');
  mxUtils.write(E, mxResources.get('plantUml') + ' (' + mxResources.get('formatSvg') + ')');
  'plantUml' == f && E.setAttribute('selected', 'selected');
  z = document.createElement('option');
  z.setAttribute('value', 'plantUmlPng');
  mxUtils.write(z, mxResources.get('plantUml') + ' (' + mxResources.get('formatPng') + ')');
  D = document.createElement('option');
  D.setAttribute('value', 'plantUmlTxt');
  mxUtils.write(D, mxResources.get('plantUml') + ' (' + mxResources.get('text') + ')');
  EditorUi.enablePlantUml && Graph.fileSupport && !b.isOffline() && 'plantUml' == f && (y.appendChild(E), y.appendChild(z), y.appendChild(D));
  var G = k();
  t.value = G;
  e.appendChild(t);
  this.init = function() {
    t.focus();
  };
  Graph.fileSupport && (t.addEventListener('dragover', function(d) {
    d.stopPropagation();
    d.preventDefault();
  }, !1), t.addEventListener('drop', function(d) {
    d.stopPropagation();
    d.preventDefault();
    if (0 < d.dataTransfer.files.length) {
      d = d.dataTransfer.files[0];
      var g = new FileReader();
      g.onload = function(n) {
        t.value = n.target.result;
      };
      g.readAsText(d);
    }
  }, !1));
  e.appendChild(y);
  mxEvent.addListener(y, 'change', function() {
    var d = k();
    if (0 == t.value.length || t.value == G)
      G = d, t.value = G;
  });
  b.isOffline() || 'mermaid' != f && 'plantUml' != f || (E = mxUtils.button(mxResources.get('help'), function() {
    b.openLink('mermaid' == f ? 'https://mermaid-js.github.io/mermaid/#/' : 'https://plantuml.com/');
  }), E.className = 'geBtn', e.appendChild(E));
  E = mxUtils.button(mxResources.get('close'), function() {
    t.value == G ? b.hideDialog() : b.confirm(mxResources.get('areYouSure'), function() {
      b.hideDialog();
    });
  });
  E.className = 'geBtn';
  b.editor.cancelFirst && e.appendChild(E);
  z = mxUtils.button(mxResources.get('insert'), function(d) {
    b.hideDialog();
    c(t.value, y.value, d);
  });
  e.appendChild(z);
  z.className = 'geBtn gePrimaryBtn';
  b.editor.cancelFirst || e.appendChild(E);
  this.container = e;
};